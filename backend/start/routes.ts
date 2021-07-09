/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'PhonesController.index')
  Route.get('/:id', 'PhonesController.view')
  Route.post('/', 'PhonesController.create')
  Route.patch('/', 'PhonesController.update')
  Route.delete('/:id', 'PhonesController.destroy')
}).prefix('phones')

Route.group(() => {
  Route.get('/', 'ManufacturersController.index')
}).prefix('manufacturers')

Route.get('/images/:id/:name', 'ImagesController.getImage')
