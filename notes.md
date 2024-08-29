400 => bad request
402 => payment required
-----------------------------

Manual validation 
```js
app.post("/api/courses",,(req, res) => {
    console.log(req.body)
    // do some validation here
    if (!req.body.title) return res.status(400).send("title not provided");
    if (!req.body.price) return res.status(400).send("price not provided");

    courses.push({
        id: courses.length + 1,
        ...req.body
    })

    res.send(courses);
})
```

-----------------------------

`app.post("api/courses" , [------------ ...handlers ---])`
...hnadlers : means that you can add any middlewares you want to add
the handlers execute in order
you can add middlware thar validate the req.json object
then you add the callback funciton which will be executed after this validation

-----------------------------

split your code to [contollers - routers] to make it more organized
in controllers, put all logic of handling the requests and responses
in routers, handle all routers like get, post, patch, delete
import the controllers into the router to use it 

-----------------------------

in `index.js`, use just the middleware which redirect to the routers 

in router, you can use `app.route` to handle duplicate routes, for example if you have same route but thier function is differnet such as 

```js
router.get("/", coursesController.getAllCourses)
outer.post("/", coursesController.createCourse)
```

you can make it more readable and more elegant

```js
router.route("/")
    .get(coursesConroller.getAllCourses)
    .post(coursesController.createCourse)
```



