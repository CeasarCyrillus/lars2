import {Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {SessionService, token_key} from "../sessionService/sessionService";
import {AuthHeader} from "../../sharedTypes/AuthHeader";

export type User = {
  name: string,
  email: string,
}

export type AuthService = {
  user$: () => Observable<User>
  isAuthenticated$: () => Observable<boolean>
  login$: (username: string, password: string) => Observable<AuthHeader>
}

export type AuthServiceDependencies = {
  socketService: SocketService,
  sessionService: SessionService,
}
export const createAuthService = (dependencies: AuthServiceDependencies): AuthService => {
  const {socketService, sessionService} = dependencies
  const loginAuthHeaderSubject$ = new Subject<AuthHeader>()
  const loginAuthHeader$ = loginAuthHeaderSubject$.pipe(
    startWith(null)
  )
  const getStoredToken = () => sessionService.get<AuthHeader>(token_key)

  const updateAuthHeader = (authHeader: AuthHeader) => {
    socketService.setAuthHeader(authHeader)
    sessionService.set(token_key, authHeader)
    loginAuthHeaderSubject$.next(authHeader)
  }

  const storedTokenIsValid$ = (storedAuth: AuthHeader) =>
    socketService.listen$<boolean>("validateAuthentication", storedAuth)

  const isAuthenticated$ = () => {
    return loginAuthHeader$.pipe(
      switchMap((freshToken) => {
        if (freshToken !== null) {
          return of(true)
        }
        const storedToken = getStoredToken()
        if (storedToken === null) {
          return of(false)
        }

        return storedTokenIsValid$(storedToken).pipe(
          tap(isValid => isValid && updateAuthHeader(storedToken)),
        );
      })
    )
  }

  const user$ = () => socketService.listen$<User>("user")

  const login$ = (username: string, password: string) =>
    socketService.listen$<AuthHeader>("login", {username, password}).pipe(
      tap(authHeader => updateAuthHeader(authHeader))
    )

  return {
    user$,
    isAuthenticated$,
    login$,
  }
}

// Not valid token in session storage: clear session storage and redirect to login

// Protected route => if authenticated successfully, render kids, otherwise redirect to login
//