## todo

- how to get a dev env going
- how to deploy

i don't think i'd use fn return fn again for DI
rather { db, blah } = app.locals
could do that with usage of core, reqs take app instead
interface App extends Express {}

- this is clean, see usage of g
- just set at app start and easy mocks for testing
  https://github.com/pallets/flask/blob/1.0.2/examples/tutorial/flaskr/db.py
  ref: http://flask.pocoo.org/docs/1.0/api/#flask.g
