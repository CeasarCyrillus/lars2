import {map, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {SessionService, token_key} from "../sessionService/sessionService";
import {Authentication} from "@backend/dto/Authentication";

export type AuthService = {
  isAuthenticated$: () => Observable<boolean>
  login$: (username: string, password: string) => Observable<void>
}

export type AuthServiceDependencies = {
  socketService: SocketService,
  sessionService: SessionService,
}
export const createAuthService = (dependencies: AuthServiceDependencies): AuthService => {
  const {socketService, sessionService} = dependencies
  const loginAuthHeaderSubject$ = new Subject<Authentication>()
  const loginAuthHeader$ = loginAuthHeaderSubject$.pipe(
    startWith(null)
  )
  const getStoredToken = () => sessionService.get<Authentication>(token_key)

  const updateAuthHeader = (authentication: Authentication) => {
    sessionService.set(token_key, authentication)
    socketService.setSocketAuthentication(authentication)
    loginAuthHeaderSubject$.next(authentication)
  }

  const storedTokenIsValid$ = (storedAuth: Authentication) => socketService.validateAuthentication$(storedAuth)

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

  const login$ = (username: string, password: string): Observable<void> =>
    socketService.login$({username, password}).pipe(
      tap(updateAuthHeader),
      map(() => undefined)
    )

  return {
    isAuthenticated$,
    login$
  }
}