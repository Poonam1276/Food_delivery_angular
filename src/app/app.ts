import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
<<<<<<< HEAD
   standalone: true,
  imports: [ RouterModule,RouterOutlet],
=======
  imports: [ RouterOutlet, RouterModule],
>>>>>>> 3d102429375c0c146c8055fa677e902fe1f050ab
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}



// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule],
//   template: `<router-outlet></router-outlet>`
// })
// export class App {}