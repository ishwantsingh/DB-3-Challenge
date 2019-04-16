exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "web1" },
        { name: "data2" },
        { name: "ml3" }
      ]);
    });
};
