import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'home', component: HomeComponent },
            {
                path: 'shopping-lists',
                data: { preload: false },
                loadChildren: () =>
                    import('./shopping-lists/shopping-list.module').then(m => m.ShoppingListModule)
            },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }

        ], {enableTracing: true, preloadingStrategy: SelectiveStrategy })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}