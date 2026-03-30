import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthFacade } from "../../store/auth/auth.facade";
import { map, take } from "rxjs";

export const unauthenticatedGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if(isAuthenticated) {
        return router.parseUrl('/network');
      }
      return true;
    })  
  );
}