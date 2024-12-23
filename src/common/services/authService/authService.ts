import {map, Observable, of, startWith, Subject, switchMap, tap} from "rxjs";
import {SocketService} from "../socketService/socketService";
import {SessionService, token_key} from "../sessionService/sessionService";
import {Authentication} from "@backend/dto/Authentication";

export type AuthService = {
  isAuthenticated$: () => Observable<boolean>
  login$: (username: string, password: string) => Observable<void>
  logout: () => void
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

  const isAuthenticated$ = () =>
      loginAuthHeader$.pipe(
          switchMap((freshToken) => {
            if (freshToken !== null) {
              return of(true)
            }
            const storedToken = getStoredToken()
            if (storedToken === null) {
              return of(false)
            }

            return socketService.validateAuthentication$(storedToken).pipe(
                tap(isValid => isValid && updateAuthHeader(storedToken)),
            );
          }),
      )

  const login$ = (username: string, password: string): Observable<void> =>
    socketService.login$({username, password}).pipe(
      tap(updateAuthHeader),
      map(() => undefined),
    )

  const logout = () => {
    sessionService.remove(token_key)
    window.location.reload()
  }

  return {
    isAuthenticated$,
    login$,
    logout
  }
}