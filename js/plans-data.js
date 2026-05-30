/*
 * plans-data.js
 * ------------------------------------------------------------------
 * Ready-made 7-day balanced meal plans. Each day pairs a breakfast +
 * lunch + dinner, so every day totals ~210 g protein (3 x 70 g) with
 * low sugar. Plans rotate protein sources for variety and balance.
 *
 * "meals" holds recipe ids that map to window.RECIPES. The Plans tab
 * can load any week straight into the Planner to auto-build the
 * week's grocery list. Snacks (the Snack recipes) are optional extras
 * you can add on hungrier days.
 */

window.MEAL_PLANS = [
  {
    id: "balanced-classic",
    name: "Balanced Week — Classic",
    subtitle: "Broad rotation - the everyday all-rounder",
    description:
      "A little of everything: chicken, beef, salmon, pork, shrimp, turkey, eggs and dairy " +
      "spread evenly across the week so no protein source repeats two days running.",
    days: [
      { day: "Monday",    meals: ["spinach-feta-egg-white-scramble", "grilled-chicken-feta-power-bowl", "baked-salmon-asparagus-parmesan"] },
      { day: "Tuesday",   meals: ["greek-yogurt-berry-protein-bowl", "beef-broccoli-stir-fry", "pork-tenderloin-green-beans"] },
      { day: "Wednesday", meals: ["western-omelette-egg-whites", "tuna-avocado-lettuce-wraps", "sheet-pan-chicken-thighs-brussels"] },
      { day: "Thursday",  meals: ["chocolate-pb-protein-smoothie", "turkey-cobb-salad", "garlic-butter-steak-mushrooms"] },
      { day: "Friday",    meals: ["cottage-smoked-salmon-bowl", "chicken-caesar-no-crouton", "shrimp-scampi-zoodles"] },
      { day: "Saturday",  meals: ["protein-pancakes", "shrimp-avocado-cauli-rice-bowl", "low-carb-beef-chili"] },
      { day: "Sunday",    meals: ["smoked-salmon-egg-rollups", "egg-salad-smoked-turkey-plate", "greek-chicken-souvlaki-bowl"] }
    ]
  },
  {
    id: "balanced-mediterranean",
    name: "Balanced Week — Mediterranean-Leaning",
    subtitle: "More fish, olive oil & Greek flavors",
    description:
      "Tilts toward seafood (salmon, cod, shrimp, tuna), chicken with feta, souvlaki and tofu, " +
      "with olive-oil-forward, vegetable-rich plates in the Mediterranean style.",
    days: [
      { day: "Monday",    meals: ["cottage-smoked-salmon-bowl", "grilled-chicken-feta-power-bowl", "baked-cod-lemon-broccoli"] },
      { day: "Tuesday",   meals: ["greek-yogurt-berry-protein-bowl", "tuna-avocado-lettuce-wraps", "baked-salmon-asparagus-parmesan"] },
      { day: "Wednesday", meals: ["spinach-feta-egg-white-scramble", "shrimp-avocado-cauli-rice-bowl", "greek-chicken-souvlaki-bowl"] },
      { day: "Thursday",  meals: ["smoked-salmon-egg-rollups", "chicken-caesar-no-crouton", "shrimp-scampi-zoodles"] },
      { day: "Friday",    meals: ["chocolate-pb-protein-smoothie", "tofu-edamame-sesame-bowl", "chicken-parmesan-zoodles"] },
      { day: "Saturday",  meals: ["protein-pancakes", "turkey-cobb-salad", "sheet-pan-chicken-thighs-brussels"] },
      { day: "Sunday",    meals: ["western-omelette-egg-whites", "egg-salad-smoked-turkey-plate", "pork-tenderloin-green-beans"] }
    ]
  },
  {
    id: "balanced-lean-light",
    name: "Balanced Week — Lean & Light",
    subtitle: "Favors the lowest-calorie recipes",
    description:
      "Built from the leanest meals in the book - cod, pork tenderloin, shrimp, egg-white dishes, " +
      "cottage cheese and yogurt - for when you want maximum protein at the lowest calories.",
    days: [
      { day: "Monday",    meals: ["chocolate-pb-protein-smoothie", "shrimp-avocado-cauli-rice-bowl", "baked-cod-lemon-broccoli"] },
      { day: "Tuesday",   meals: ["greek-yogurt-berry-protein-bowl", "grilled-chicken-feta-power-bowl", "pork-tenderloin-green-beans"] },
      { day: "Wednesday", meals: ["protein-pancakes", "tuna-avocado-lettuce-wraps", "shrimp-scampi-zoodles"] },
      { day: "Thursday",  meals: ["cottage-smoked-salmon-bowl", "chicken-caesar-no-crouton", "turkey-zucchini-taco-skillet"] },
      { day: "Friday",    meals: ["chocolate-pb-protein-smoothie", "tofu-edamame-sesame-bowl", "greek-chicken-souvlaki-bowl"] },
      { day: "Saturday",  meals: ["spinach-feta-egg-white-scramble", "shrimp-avocado-cauli-rice-bowl", "baked-cod-lemon-broccoli"] },
      { day: "Sunday",    meals: ["greek-yogurt-berry-protein-bowl", "tuna-avocado-lettuce-wraps", "sheet-pan-chicken-thighs-brussels"] }
    ]
  }
];
