/*
 * plans-data.js
 * ------------------------------------------------------------------
 * Ready-made 7-day balanced meal plans. Each day pairs a breakfast +
 * lunch + dinner, so every day totals ~210 g protein (3 x 70 g) with
 * low sugar. Plans rotate protein sources for variety and balance.
 *
 * "meals" holds the 3 MAIN recipe ids (breakfast/lunch/dinner) that map
 * to window.RECIPES, totalling ~210 g protein/day. "snack" is an OPTIONAL
 * 4th recipe (a Snack-category meal, +~70 g) the Plans tab can fold in via
 * a per-plan toggle, taking the day to ~280 g protein for heavier-training
 * or bigger-appetite days. The Plans tab can load any week straight into
 * the Planner to auto-build the week's grocery list.
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
      { day: "Monday",    meals: ["spinach-feta-egg-white-scramble", "grilled-chicken-feta-power-bowl", "baked-salmon-asparagus-parmesan"], snack: "vanilla-almond-protein-shake" },
      { day: "Tuesday",   meals: ["greek-yogurt-berry-protein-bowl", "beef-broccoli-stir-fry", "pork-tenderloin-green-beans"], snack: "greek-yogurt-protein-mousse" },
      { day: "Wednesday", meals: ["western-omelette-egg-whites", "tuna-avocado-lettuce-wraps", "sheet-pan-chicken-thighs-brussels"], snack: "edamame-cottage-cheese-bowl" },
      { day: "Thursday",  meals: ["chocolate-pb-protein-smoothie", "turkey-cobb-salad", "garlic-butter-steak-mushrooms"], snack: "cottage-cheese-cucumber-plate" },
      { day: "Friday",    meals: ["cottage-smoked-salmon-bowl", "chicken-caesar-no-crouton", "shrimp-scampi-zoodles"], snack: "turkey-cheese-snack-box" },
      { day: "Saturday",  meals: ["protein-pancakes", "shrimp-avocado-cauli-rice-bowl", "low-carb-beef-chili"], snack: "greek-yogurt-protein-mousse" },
      { day: "Sunday",    meals: ["smoked-salmon-egg-rollups", "egg-salad-smoked-turkey-plate", "greek-chicken-souvlaki-bowl"], snack: "vanilla-almond-protein-shake" }
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
      { day: "Monday",    meals: ["cottage-smoked-salmon-bowl", "grilled-chicken-feta-power-bowl", "baked-cod-lemon-broccoli"], snack: "greek-yogurt-protein-mousse" },
      { day: "Tuesday",   meals: ["greek-yogurt-berry-protein-bowl", "tuna-avocado-lettuce-wraps", "baked-salmon-asparagus-parmesan"], snack: "vanilla-almond-protein-shake" },
      { day: "Wednesday", meals: ["spinach-feta-egg-white-scramble", "shrimp-avocado-cauli-rice-bowl", "greek-chicken-souvlaki-bowl"], snack: "edamame-cottage-cheese-bowl" },
      { day: "Thursday",  meals: ["smoked-salmon-egg-rollups", "chicken-caesar-no-crouton", "shrimp-scampi-zoodles"], snack: "cottage-cheese-cucumber-plate" },
      { day: "Friday",    meals: ["chocolate-pb-protein-smoothie", "tofu-edamame-sesame-bowl", "chicken-parmesan-zoodles"], snack: "vanilla-almond-protein-shake" },
      { day: "Saturday",  meals: ["protein-pancakes", "turkey-cobb-salad", "sheet-pan-chicken-thighs-brussels"], snack: "greek-yogurt-protein-mousse" },
      { day: "Sunday",    meals: ["western-omelette-egg-whites", "egg-salad-smoked-turkey-plate", "pork-tenderloin-green-beans"], snack: "turkey-cheese-snack-box" }
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
      { day: "Monday",    meals: ["chocolate-pb-protein-smoothie", "shrimp-avocado-cauli-rice-bowl", "baked-cod-lemon-broccoli"], snack: "greek-yogurt-protein-mousse" },
      { day: "Tuesday",   meals: ["greek-yogurt-berry-protein-bowl", "grilled-chicken-feta-power-bowl", "pork-tenderloin-green-beans"], snack: "vanilla-almond-protein-shake" },
      { day: "Wednesday", meals: ["protein-pancakes", "tuna-avocado-lettuce-wraps", "shrimp-scampi-zoodles"], snack: "greek-yogurt-protein-mousse" },
      { day: "Thursday",  meals: ["cottage-smoked-salmon-bowl", "chicken-caesar-no-crouton", "turkey-zucchini-taco-skillet"], snack: "vanilla-almond-protein-shake" },
      { day: "Friday",    meals: ["chocolate-pb-protein-smoothie", "tofu-edamame-sesame-bowl", "greek-chicken-souvlaki-bowl"], snack: "greek-yogurt-protein-mousse" },
      { day: "Saturday",  meals: ["spinach-feta-egg-white-scramble", "shrimp-avocado-cauli-rice-bowl", "baked-cod-lemon-broccoli"], snack: "vanilla-almond-protein-shake" },
      { day: "Sunday",    meals: ["greek-yogurt-berry-protein-bowl", "tuna-avocado-lettuce-wraps", "sheet-pan-chicken-thighs-brussels"], snack: "greek-yogurt-protein-mousse" }
    ]
  }
];
