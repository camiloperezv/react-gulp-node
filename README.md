# What the hell is this

Once, we had a problem, how to add React to an existent project which uses Angular and was built on express. After a search I fownd no solution to do so. Then I implemented this Architecture based on independant apps, wich each one will be compiled by gulp and served independantly  by Express.

## How to create new app

In the future i planned to add a script to create automatically a module, but now you must follow this steps in order to serve your app on express.

- Create the `src` folder
  
  You must create a folder named as you want in `src_react_apps` 

- Copy the example

  I truly suggest you to copy one of my example folder,  because of the webpack.config.js

- Edit webpack.config.js

  In this file you just have to change the `const currentModule` for the name of your app, for instance, if the folder was named `new_module`, then this variable should be `const currentModule = 'new_module'`

- Be careful with the structure

  The core of the app will be placed on the folder root, like `new_module/`, and all the components should be placed on `new_module/components` like `new_module/components/module1`, `new_module/components/module2` ....
  
  Each module should have 3 files, the .js .css and .test.js

- Edit the gulpfile.js

  - Add the module

    First you must edit the variable `const reactModulesNames`, this variable must be an array containing all the modules names.

  - Create the task

    For create the task you shoul create a new line between the comments `/* **GULP_TAG_BUILD:JS:MODULE** */` and `/* **GULP_TAG_END_BUILD:JS:MODULE** */`

    This line must be like this

    `gulp.task('build:js:REPLACEME', (cb) => { callWebpack(reactModules.REPLACEME.config, cb); });`

    Pleace note the REPLACEME string, you should replace it with YOUR MODULE NAME

  - Create the route

    To create a route go to `routes/index.js` and add a new route and put a line like this in it `res.sendFile(path.join(__dirname, '../public', 'build_react_apps', 'CHANGE_ME', 'index.html'));` making sure to change the `CHANGE_ME` string for your project name
    
## How to run it

To run the project in development mode you shoudl start the node server in one terminal using `nodemon` or whatever you want, in other terminar you should run `gulp react:dev`

## How to build it

To build the project run `gulp react:dev`