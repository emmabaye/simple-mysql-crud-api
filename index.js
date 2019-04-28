const route = (app, connection) => {
  app.get("/", (req, res) => {
    return res.json({ message: "SIMPLE CRUD API" });
  });

  // Get all actors
  app.get("/actors", (req, res) => {
    connection.query("SELECT * FROM actor", (error, results, fields) => {
      if (error) throw error;

      return res.json({ data: results });
    });
  });

  // Get actor by id
  app.get("/actors/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
      `SELECT * FROM actor WHERE actor_id="${id}"`,
      (error, results, fields) => {
        if (error) throw error;

        return res.json({ data: results });
      }
    );
  });

  //Create actor
  app.post("/actors", (req, res) => {
    const { firstName, lastName } = req.body;

    connection.query(
      `INSERT INTO actor (actor_id, first_name, last_name, last_update)
           VALUES(DEFAULT, '${firstName}', '${lastName}', DEFAULT)`,
      function(error, results, fields) {
        if (error) throw error;

        if (results) {
          const actorId = results.insertId;

          connection.query(
            `SELECT * FROM actor WHERE actor_id='${actorId}'`,
            function(error, results, fields) {
              if (error) throw error;
              return res.json({ data: results });
            }
          );
        }
      }
    );
  });

  // Update actor by id
  app.put("/actors/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
      `SELECT * FROM actor WHERE actor_id="${id}"`,
      (error, results, fields) => {
        if (error) throw error;

        if (results) {
          const firstName = req.body.firstName || results[0].first_name;
          const lastName = req.body.lastName || results[0].last_name;

          connection.query(
            `UPDATE actor SET last_name='${lastName}',first_name='${firstName}' WHERE actor_id='${id}'`,
            (error, results, fields) => {
              if (error) throw error;

              if (results) {
                return res.json({ data: results });
              }
            }
          );
        }
      }
    );
  });

  //delete actor
  app.delete("/actors/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
      `DELETE FROM actor WHERE actor_id="${id}"`,
      (error, results, fields) => {
        if (error) throw error;

        return res.json({ data: results });
      }
    );
  });
};

export default route;
