import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthFacade } from "../../store/auth/auth.facade";
import { map, take } from "rxjs";

export const authenticatedGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if(isAuthenticated) {
        return true;
      }
      return router.parseUrl('/login');
    })
  );
}