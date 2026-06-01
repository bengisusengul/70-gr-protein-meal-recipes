/*
 * recipes-data.js
 * ------------------------------------------------------------------
 * The High-Protein (70 g) Low-Carb Cookbook — recipe database.
 *
 * THE UNBREAKABLE RULE: every recipe delivers ~70 g of protein
 * (target 68-72 g) and keeps NET carbs low (target < 20 g per serving).
 *
 * Each recipe = ONE serving. To cook several servings (e.g. meal-prep
 * a dinner 3x for the week) set the "servings" multiplier in the Planner.
 *
 * Macros are realistic estimates based on standard food-composition
 * values (USDA-style). Treat them as a close guide, not a lab assay —
 * exact numbers vary with brand, cut, and cooking method.
 *
 * aisle values power the grouped shopping list. Keep them from this set:
 *   Meat & Poultry | Seafood | Eggs & Dairy | Produce | Pantry |
 *   Condiments & Spices | Supplements | Frozen
 * Ingredients with qty:null are pantry staples used "to taste".
 */

window.RECIPES = [
  /* ============================ BREAKFAST ============================ */
  {
    id: "spinach-feta-egg-white-scramble",
    name: "Spinach & Feta Egg-White Scramble with Turkey Sausage",
    category: "Breakfast",
    tags: ["eggs", "turkey", "quick", "30g-club"],
    vegetarian: false,
    time: { prep: 5, cook: 10 },
    macros: { protein: 70, netCarbs: 5, fat: 27, fiber: 2, calories: 520 },
    ingredients: [
      { item: "Liquid egg whites", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Lean turkey breakfast sausage", qty: 150, unit: "g", aisle: "Meat & Poultry" },
      { item: "Feta cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Baby spinach", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Olive oil", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Salt & black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Brown the turkey sausage in a non-stick skillet over medium heat, breaking it up, 4-5 min. Push to one side.",
      "Add olive oil and the spinach; wilt for 30 seconds.",
      "Whisk the whole eggs into the egg whites, season, and pour into the pan.",
      "Stir gently until just set, fold in the crumbled feta, and serve hot."
    ],
    notes: "Egg whites carry the protein with almost no fat; the 2 whole eggs add flavor and choline. Swap feta for goat cheese to vary it."
  },
  {
    id: "cottage-smoked-salmon-bowl",
    name: "Cottage Cheese & Smoked Salmon Breakfast Bowl",
    category: "Breakfast",
    tags: ["no-cook", "salmon", "high-omega3", "5-min"],
    vegetarian: false,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 10, fat: 22, fiber: 2, calories: 470 },
    ingredients: [
      { item: "Low-fat cottage cheese", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Smoked salmon", qty: 150, unit: "g", aisle: "Seafood" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Cucumber", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Capers", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Fresh dill", qty: null, unit: "to taste", aisle: "Produce" },
      { item: "Black pepper & lemon", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Spoon the cottage cheese into a bowl as the base.",
      "Drape the smoked salmon over the top and add the halved hard-boiled eggs.",
      "Scatter diced cucumber, capers and dill; finish with pepper and a squeeze of lemon."
    ],
    notes: "Zero cooking, three protein sources. Smoked salmon brings omega-3s; rinse capers if you want less sodium."
  },
  {
    id: "greek-yogurt-berry-protein-bowl",
    name: "Greek Yogurt & Berry Protein Bowl",
    category: "Breakfast",
    tags: ["no-cook", "vegetarian", "whey", "sweet"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 71, netCarbs: 16, fat: 12, fiber: 7, calories: 470 },
    ingredients: [
      { item: "Plain 0% Greek yogurt", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "Chia seeds", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Sliced almonds", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Mixed berries", qty: 50, unit: "g", aisle: "Produce" },
      { item: "Cinnamon", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Stir the whey powder into the Greek yogurt with a splash of water until smooth and mousse-like.",
      "Top with chia seeds, almonds, berries and a dusting of cinnamon.",
      "For a thicker texture, let it sit 5 minutes so the chia hydrates."
    ],
    notes: "Berries are kept to 50 g to hold the carbs down while still giving antioxidants and fiber."
  },
  {
    id: "western-omelette-egg-whites",
    name: "Western Omelette with Egg Whites, Ham & Cheddar",
    category: "Breakfast",
    tags: ["eggs", "ham", "classic"],
    vegetarian: false,
    time: { prep: 5, cook: 8 },
    macros: { protein: 71, netCarbs: 9, fat: 30, fiber: 2, calories: 540 },
    ingredients: [
      { item: "Large eggs", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Lean diced ham", qty: 100, unit: "g", aisle: "Meat & Poultry" },
      { item: "Sharp cheddar cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Green bell pepper", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Onion", qty: 30, unit: "g", aisle: "Produce" },
      { item: "Butter", qty: 1, unit: "tsp", aisle: "Eggs & Dairy" },
      { item: "Salt & black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Saute diced pepper, onion and ham in butter over medium heat until softened, 3-4 min.",
      "Whisk whole eggs with egg whites, season, and pour over the filling.",
      "As the edges set, lift them to let raw egg run underneath.",
      "Scatter cheddar on one half, fold, and slide onto a plate."
    ],
    notes: "A diner classic re-balanced toward protein by boosting the whites and trimming the cheese."
  },
  {
    id: "protein-pancakes",
    name: "Fluffy Protein Pancakes",
    category: "Breakfast",
    tags: ["vegetarian", "whey", "sweet", "weekend"],
    vegetarian: true,
    time: { prep: 5, cook: 10 },
    macros: { protein: 71, netCarbs: 9, fat: 14, fiber: 3, calories: 470 },
    ingredients: [
      { item: "Vanilla whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "Liquid egg whites", qty: 180, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Almond flour", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Baking powder", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Mixed berries", qty: 30, unit: "g", aisle: "Produce" },
      { item: "Sugar-free syrup", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Blend whey, egg whites, cottage cheese, almond flour and baking powder into a smooth batter.",
      "Cook small pancakes on a non-stick griddle over medium-low heat until bubbles form, then flip.",
      "Stack and top with berries and a drizzle of sugar-free syrup."
    ],
    notes: "Cottage cheese keeps them moist; almond flour adds just enough structure without the carbs of wheat flour."
  },
  {
    id: "smoked-salmon-egg-rollups",
    name: "Smoked Salmon & Cream Cheese Egg Roll-Ups",
    category: "Breakfast",
    tags: ["eggs", "salmon", "low-carb-star", "5g-carb"],
    vegetarian: false,
    time: { prep: 5, cook: 8 },
    macros: { protein: 72, netCarbs: 4, fat: 30, fiber: 0, calories: 520 },
    ingredients: [
      { item: "Large eggs", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Smoked salmon", qty: 120, unit: "g", aisle: "Seafood" },
      { item: "Light cream cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Fresh chives", qty: null, unit: "to taste", aisle: "Produce" },
      { item: "Black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Whisk whole eggs with egg whites and pour a thin layer into a non-stick pan to make a flat egg crepe; cook until set, then slide out. Repeat.",
      "Spread each egg crepe with cream cheese, lay on smoked salmon, sprinkle chives.",
      "Roll up tightly and slice into pinwheels."
    ],
    notes: "One of the lowest-carb meals in the book at ~4 g net carbs, yet a full 72 g protein."
  },
  {
    id: "chocolate-pb-protein-smoothie",
    name: "Chocolate Peanut Butter Protein Smoothie",
    category: "Breakfast",
    tags: ["vegetarian", "whey", "blender", "on-the-go"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 71, netCarbs: 14, fat: 9, fiber: 6, calories: 420 },
    ingredients: [
      { item: "Chocolate whey protein powder", qty: 60, unit: "g", aisle: "Supplements" },
      { item: "Plain 0% Greek yogurt", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Powdered peanut butter (PB2)", qty: 16, unit: "g", aisle: "Pantry" },
      { item: "Unsweetened cocoa powder", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Unsweetened almond milk", qty: 250, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Ice cubes", qty: null, unit: "to taste", aisle: "Pantry" }
    ],
    steps: [
      "Add everything to a blender.",
      "Blend until thick and frosty, adding more almond milk to reach the texture you like."
    ],
    notes: "Powdered peanut butter gives the flavor of PB with a fraction of the fat and calories. Two scoops of whey + yogurt do the protein heavy lifting."
  },

  /* ============================== LUNCH ============================== */
  {
    id: "grilled-chicken-feta-power-bowl",
    name: "Grilled Chicken & Feta Power Bowl",
    category: "Lunch",
    tags: ["chicken", "meal-prep", "mediterranean"],
    vegetarian: false,
    time: { prep: 10, cook: 15 },
    macros: { protein: 71, netCarbs: 10, fat: 26, fiber: 4, calories: 520 },
    ingredients: [
      { item: "Chicken breast", qty: 210, unit: "g", aisle: "Meat & Poultry" },
      { item: "Feta cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Mixed salad greens", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Cucumber", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Cherry tomatoes", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Kalamata olives", qty: 6, unit: "", aisle: "Condiments & Spices" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Lemon juice, oregano, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Season the chicken with oregano, salt and pepper and grill or pan-sear ~6-7 min per side until 74C/165F. Rest, then slice.",
      "Toss greens, cucumber, tomatoes and olives with olive oil and lemon.",
      "Top with the sliced chicken and crumbled feta."
    ],
    notes: "Cooked-weight chicken (~210 g) does most of the protein work; weigh it after cooking for accuracy."
  },
  {
    id: "tuna-avocado-lettuce-wraps",
    name: "Tuna & Avocado Salad Lettuce Wraps",
    category: "Lunch",
    tags: ["no-cook", "tuna", "budget", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 0 },
    macros: { protein: 72, netCarbs: 6, fat: 28, fiber: 7, calories: 520 },
    ingredients: [
      { item: "Canned tuna in water (drained)", qty: 240, unit: "g", aisle: "Pantry" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Avocado", qty: 75, unit: "g", aisle: "Produce" },
      { item: "Plain 0% Greek yogurt", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Red onion", qty: 20, unit: "g", aisle: "Produce" },
      { item: "Celery", qty: 30, unit: "g", aisle: "Produce" },
      { item: "Large lettuce leaves", qty: 6, unit: "", aisle: "Produce" },
      { item: "Dijon mustard, lemon, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mash tuna with chopped egg, avocado, Greek yogurt, mustard and lemon.",
      "Fold in diced onion and celery; season.",
      "Spoon into lettuce leaves and roll up."
    ],
    notes: "Greek yogurt replaces most of the mayo, adding protein and cutting fat. Avocado adds creaminess and fiber."
  },
  {
    id: "turkey-cobb-salad",
    name: "Turkey Cobb Salad",
    category: "Lunch",
    tags: ["turkey", "eggs", "classic", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 5 },
    macros: { protein: 72, netCarbs: 8, fat: 30, fiber: 5, calories: 560 },
    ingredients: [
      { item: "Roast turkey breast", qty: 180, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Cooked bacon", qty: 1, unit: "slice", aisle: "Meat & Poultry" },
      { item: "Blue cheese", qty: 20, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Avocado", qty: 50, unit: "g", aisle: "Produce" },
      { item: "Romaine lettuce", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Cherry tomatoes", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Olive oil & red wine vinegar", qty: 1, unit: "tbsp", aisle: "Pantry" }
    ],
    steps: [
      "Arrange chopped romaine on a plate or in a jar.",
      "Lay out rows of diced turkey, egg, tomato, avocado, crumbled bacon and blue cheese.",
      "Whisk oil and vinegar with salt and pepper; drizzle over just before eating."
    ],
    notes: "The turkey is the protein engine; bacon and blue cheese are accents, not the foundation."
  },
  {
    id: "shrimp-avocado-cauli-rice-bowl",
    name: "Shrimp & Avocado Cauliflower-Rice Bowl",
    category: "Lunch",
    tags: ["shrimp", "low-cal", "quick"],
    vegetarian: false,
    time: { prep: 10, cook: 8 },
    macros: { protein: 70, netCarbs: 9, fat: 20, fiber: 6, calories: 480 },
    ingredients: [
      { item: "Raw shrimp, peeled", qty: 320, unit: "g", aisle: "Seafood" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Avocado", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Plain 0% Greek yogurt", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Lime", qty: 1, unit: "", aisle: "Produce" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Garlic, chili powder, cilantro, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Toss shrimp with garlic, chili powder and salt. Sear in olive oil 2-3 min until pink.",
      "Saute cauliflower rice in the same pan until tender, 3-4 min.",
      "Whisk Greek yogurt with lime juice for a quick crema.",
      "Build the bowl: cauli rice, shrimp, sliced avocado, crema and cilantro."
    ],
    notes: "Shrimp is extremely protein-dense and lean, so this bowl lands 70 g protein at under 500 calories."
  },
  {
    id: "chicken-caesar-no-crouton",
    name: "Chicken Caesar Salad (No Croutons)",
    category: "Lunch",
    tags: ["chicken", "classic", "quick"],
    vegetarian: false,
    time: { prep: 10, cook: 12 },
    macros: { protein: 72, netCarbs: 5, fat: 30, fiber: 3, calories: 540 },
    ingredients: [
      { item: "Chicken breast", qty: 210, unit: "g", aisle: "Meat & Poultry" },
      { item: "Parmesan cheese", qty: 20, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Romaine lettuce", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Caesar dressing (no sugar added)", qty: 2, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Lemon & black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Season and grill the chicken until cooked through; rest and slice.",
      "Toss chopped romaine with Caesar dressing and most of the parmesan.",
      "Top with chicken, the rest of the parmesan, a squeeze of lemon and cracked pepper."
    ],
    notes: "Dropping the croutons removes the refined carbs; protein comes from the chicken and a generous hit of parmesan."
  },
  {
    id: "beef-broccoli-stir-fry",
    name: "Beef & Broccoli Stir-Fry",
    category: "Lunch",
    tags: ["beef", "stir-fry", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 12 },
    macros: { protein: 72, netCarbs: 9, fat: 24, fiber: 4, calories: 520 },
    ingredients: [
      { item: "Flank or sirloin steak, sliced", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Broccoli florets", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Tamari or soy sauce (low-sodium)", qty: 2, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Sesame oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Garlic & fresh ginger", qty: null, unit: "to taste", aisle: "Produce" },
      { item: "Granulated erythritol or monk fruit", qty: 1, unit: "tsp", aisle: "Condiments & Spices" },
      { item: "Toasted sesame seeds", qty: 1, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Sear the sliced beef in hot sesame oil for 1-2 min until browned; remove.",
      "Stir-fry broccoli with garlic and ginger, adding a splash of water to steam, 4-5 min.",
      "Return beef, add tamari and sweetener, toss 1 minute, and finish with sesame seeds."
    ],
    notes: "A pinch of erythritol mimics the sweetness of a takeout sauce without the sugar load."
  },
  {
    id: "egg-salad-smoked-turkey-plate",
    name: "Egg Salad & Smoked Turkey Protein Plate",
    category: "Lunch",
    tags: ["no-cook", "eggs", "turkey", "5-min"],
    vegetarian: false,
    time: { prep: 10, cook: 0 },
    macros: { protein: 70, netCarbs: 6, fat: 34, fiber: 2, calories: 560 },
    ingredients: [
      { item: "Large eggs (hard-boiled)", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Smoked deli turkey", qty: 220, unit: "g", aisle: "Meat & Poultry" },
      { item: "Sharp cheddar cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Plain 0% Greek yogurt", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber & cherry tomatoes", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Dijon mustard, salt, pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mash the hard-boiled eggs with Greek yogurt and mustard; season.",
      "Arrange the egg salad, rolled smoked turkey, cheddar and fresh vegetables on a plate.",
      "Eat as a composed plate or wrap the turkey around the egg salad."
    ],
    notes: "A no-cook, high-protein 'snack plate' scaled up to a full 70 g meal. Great for office lunches."
  },
  {
    id: "tofu-edamame-sesame-bowl",
    name: "Sesame Tofu & Edamame Bowl",
    category: "Lunch",
    tags: ["vegetarian", "vegan", "tofu", "meal-prep"],
    vegetarian: true,
    time: { prep: 10, cook: 15 },
    macros: { protein: 70, netCarbs: 13, fat: 26, fiber: 9, calories: 540 },
    ingredients: [
      { item: "Extra-firm tofu", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Shelled edamame", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Hemp hearts", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Tamari or soy sauce", qty: 2, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Sesame oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Rice vinegar & fresh ginger", qty: null, unit: "to taste", aisle: "Condiments & Spices" },
      { item: "Toasted sesame seeds & scallion", qty: 1, unit: "tbsp", aisle: "Pantry" }
    ],
    steps: [
      "Press the tofu, cube it, and pan-fry or air-fry until golden and crisp on all sides.",
      "Steam or microwave the edamame until tender.",
      "Toss tofu and edamame with tamari, sesame oil, rice vinegar and ginger.",
      "Top with hemp hearts, sesame seeds and scallion."
    ],
    notes: "A fully plant-based 70 g meal. Extra-firm tofu, edamame and hemp hearts stack the protein while keeping net carbs in range."
  },

  /* ============================== DINNER ============================= */
  {
    id: "baked-salmon-asparagus-parmesan",
    name: "Baked Salmon with Asparagus & Parmesan",
    category: "Dinner",
    tags: ["salmon", "high-omega3", "sheet-pan"],
    vegetarian: false,
    time: { prep: 5, cook: 18 },
    macros: { protein: 70, netCarbs: 5, fat: 38, fiber: 3, calories: 600 },
    ingredients: [
      { item: "Salmon fillet", qty: 280, unit: "g", aisle: "Seafood" },
      { item: "Asparagus", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Parmesan cheese", qty: 15, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Lemon, garlic, salt, pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 200C/400F. Place salmon and asparagus on a lined sheet pan.",
      "Drizzle with olive oil, garlic, salt and pepper.",
      "Roast 12-15 min until salmon flakes; sprinkle parmesan over the asparagus for the last 3 min.",
      "Finish with a squeeze of lemon."
    ],
    notes: "Fatty fish means higher healthy-fat calories; the omega-3s are worth it. Cod or haddock is the leaner swap (see the cod recipe)."
  },
  {
    id: "sheet-pan-chicken-thighs-brussels",
    name: "Sheet-Pan Chicken Thighs with Brussels Sprouts",
    category: "Dinner",
    tags: ["chicken", "sheet-pan", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 25 },
    macros: { protein: 70, netCarbs: 7, fat: 30, fiber: 5, calories: 560 },
    ingredients: [
      { item: "Boneless skinless chicken thighs", qty: 270, unit: "g", aisle: "Meat & Poultry" },
      { item: "Brussels sprouts, halved", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Smoked paprika, garlic powder, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" },
      { item: "Dijon mustard", qty: 1, unit: "tsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 220C/425F. Toss thighs and sprouts with oil and seasonings on a sheet pan.",
      "Roast 22-25 min, turning the sprouts once, until chicken reaches 74C/165F and sprouts are crisp-edged.",
      "Brush the chicken with a little Dijon before serving."
    ],
    notes: "Thighs are juicier than breast and still hit the protein target at this portion. One pan, easy clean-up."
  },
  {
    id: "garlic-butter-steak-mushrooms",
    name: "Garlic Butter Steak with Sauteed Mushrooms",
    category: "Dinner",
    tags: ["beef", "low-carb-star", "date-night"],
    vegetarian: false,
    time: { prep: 5, cook: 12 },
    macros: { protein: 70, netCarbs: 5, fat: 32, fiber: 2, calories: 560 },
    ingredients: [
      { item: "Sirloin steak", qty: 240, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cremini mushrooms", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Butter", qty: 1, unit: "tbsp", aisle: "Eggs & Dairy" },
      { item: "Garlic", qty: 2, unit: "cloves", aisle: "Produce" },
      { item: "Fresh thyme, salt, pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Season the steak generously and sear in a hot pan 3-4 min per side for medium; rest 5 min.",
      "In the same pan, melt butter and saute mushrooms with garlic and thyme until golden.",
      "Slice the steak against the grain and spoon the garlic-butter mushrooms over the top."
    ],
    notes: "Naturally low-carb and deeply satisfying. Choose a lean sirloin to keep saturated fat moderate."
  },
  {
    id: "turkey-zucchini-taco-skillet",
    name: "Turkey & Zucchini Taco Skillet",
    category: "Dinner",
    tags: ["turkey", "one-pan", "tex-mex"],
    vegetarian: false,
    time: { prep: 10, cook: 15 },
    macros: { protein: 71, netCarbs: 10, fat: 28, fiber: 3, calories: 520 },
    ingredients: [
      { item: "93% lean ground turkey", qty: 240, unit: "g", aisle: "Meat & Poultry" },
      { item: "Zucchini", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Bell pepper", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Shredded cheddar", qty: 25, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Taco seasoning (no sugar added)", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Olive oil", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Avocado & cilantro (optional)", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Brown the ground turkey in olive oil, breaking it up.",
      "Add diced zucchini and pepper plus the taco seasoning and a splash of water; cook 5-6 min.",
      "Top with cheddar, cover to melt, and garnish with avocado and cilantro."
    ],
    notes: "All the flavor of tacos without the tortillas. Zucchini bulks it up for very few carbs."
  },
  {
    id: "pork-tenderloin-green-beans",
    name: "Mustard-Glazed Pork Tenderloin with Green Beans",
    category: "Dinner",
    tags: ["pork", "lean", "low-cal"],
    vegetarian: false,
    time: { prep: 10, cook: 22 },
    macros: { protein: 70, netCarbs: 7, fat: 18, fiber: 4, calories: 470 },
    ingredients: [
      { item: "Pork tenderloin", qty: 270, unit: "g", aisle: "Meat & Poultry" },
      { item: "Green beans", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Dijon mustard", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Garlic, rosemary, salt, pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 200C/400F. Rub the tenderloin with mustard, garlic, rosemary and salt.",
      "Sear in an oven-safe pan to brown all sides, then roast 12-15 min to 63C/145F; rest.",
      "Toss green beans in olive oil and roast or steam until tender. Slice the pork and serve."
    ],
    notes: "Pork tenderloin is one of the leanest cuts available, making this the lowest-calorie dinner here at a full 70 g protein."
  },
  {
    id: "baked-cod-lemon-broccoli",
    name: "Baked Cod with Lemon & Broccoli",
    category: "Dinner",
    tags: ["white-fish", "low-cal", "low-fat"],
    vegetarian: false,
    time: { prep: 5, cook: 18 },
    macros: { protein: 70, netCarbs: 6, fat: 16, fiber: 4, calories: 420 },
    ingredients: [
      { item: "Cod fillet", qty: 300, unit: "g", aisle: "Seafood" },
      { item: "Broccoli florets", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Parmesan cheese", qty: 10, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Lemon, garlic, paprika, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 200C/400F. Place cod and broccoli on a sheet pan.",
      "Drizzle with olive oil, garlic, paprika and salt; top cod with lemon slices.",
      "Bake 14-16 min until cod is opaque and flakes. Dust the broccoli with parmesan."
    ],
    notes: "Cod is ultra-lean, so you get a huge protein hit for just ~420 calories — ideal on a cut."
  },
  {
    id: "chicken-parmesan-zoodles",
    name: "Almond-Crusted Chicken Parmesan over Zoodles",
    category: "Dinner",
    tags: ["chicken", "italian", "comfort"],
    vegetarian: false,
    time: { prep: 15, cook: 20 },
    macros: { protein: 72, netCarbs: 11, fat: 30, fiber: 4, calories: 560 },
    ingredients: [
      { item: "Chicken breast", qty: 190, unit: "g", aisle: "Meat & Poultry" },
      { item: "Part-skim mozzarella", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Parmesan cheese", qty: 10, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Almond flour", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Marinara sauce (no sugar added)", qty: 60, unit: "g", aisle: "Pantry" },
      { item: "Zucchini (spiralized)", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Egg (for breading)", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Italian herbs, garlic, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 200C/400F. Dip the chicken in beaten egg, then almond flour mixed with parmesan and herbs.",
      "Pan-sear until golden, transfer to a dish, top with marinara and mozzarella, and bake 8-10 min.",
      "Quickly saute the zucchini noodles until just tender and serve the chicken on top."
    ],
    notes: "Almond flour replaces breadcrumbs; zoodles replace spaghetti. Use a marinara with no added sugar to keep carbs low."
  },
  {
    id: "low-carb-beef-chili",
    name: "Low-Carb Beef Chili",
    category: "Dinner",
    tags: ["beef", "batch-cook", "freezer-friendly"],
    vegetarian: false,
    time: { prep: 10, cook: 35 },
    macros: { protein: 72, netCarbs: 14, fat: 24, fiber: 6, calories: 520 },
    ingredients: [
      { item: "90% lean ground beef", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Black soybeans (canned, drained)", qty: 60, unit: "g", aisle: "Pantry" },
      { item: "Crushed tomatoes", qty: 120, unit: "g", aisle: "Pantry" },
      { item: "Bell pepper & onion", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Chili powder, cumin, garlic, salt", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Olive oil", qty: 1, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Brown the beef with diced pepper and onion in olive oil.",
      "Stir in the spices, crushed tomatoes and black soybeans.",
      "Simmer 25-30 min until thick; adjust seasoning."
    ],
    notes: "Black soybeans give the look and bite of chili beans with a fraction of the carbs of kidney beans. Doubles well for the freezer."
  },
  {
    id: "shrimp-scampi-zoodles",
    name: "Shrimp Scampi over Zucchini Noodles",
    category: "Dinner",
    tags: ["shrimp", "quick", "low-cal"],
    vegetarian: false,
    time: { prep: 10, cook: 10 },
    macros: { protein: 70, netCarbs: 8, fat: 22, fiber: 3, calories: 470 },
    ingredients: [
      { item: "Raw shrimp, peeled", qty: 300, unit: "g", aisle: "Seafood" },
      { item: "Zucchini (spiralized)", qty: 200, unit: "g", aisle: "Produce" },
      { item: "Butter", qty: 1, unit: "tbsp", aisle: "Eggs & Dairy" },
      { item: "Olive oil", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Parmesan cheese", qty: 10, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Garlic, white wine, lemon, parsley, chili flakes", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Saute garlic in butter and oil, add shrimp and cook 2-3 min until pink.",
      "Add a splash of white wine and lemon; simmer 1 minute.",
      "Toss in the zucchini noodles just to warm through, finish with parsley, chili flakes and parmesan."
    ],
    notes: "Don't overcook the zoodles — 60-90 seconds keeps them from going watery."
  },
  {
    id: "paneer-tofu-tikka-spinach",
    name: "Paneer & Tofu Tikka with Spinach",
    category: "Dinner",
    tags: ["vegetarian", "indian", "high-protein-veg"],
    vegetarian: true,
    time: { prep: 15, cook: 20 },
    macros: { protein: 70, netCarbs: 13, fat: 36, fiber: 5, calories: 660 },
    ingredients: [
      { item: "Paneer", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Extra-firm tofu", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Hemp hearts", qty: 25, unit: "g", aisle: "Pantry" },
      { item: "Baby spinach", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Plain 0% Greek yogurt", qty: 60, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Tikka/garam masala spice blend", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Olive oil or ghee", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Garlic, ginger, tomato paste, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Cube paneer and pressed tofu; toss with Greek yogurt and tikka spices and marinate 10 min.",
      "Sear the cubes in oil or ghee until golden on all sides; remove.",
      "Wilt spinach with garlic, ginger and a little tomato paste, return the paneer and tofu, and stir in hemp hearts.",
      "Loosen with a splash of water into a light sauce."
    ],
    notes: "Hitting 70 g protein vegetarian and low-carb is hard — paneer + tofu + hemp hearts make it work. This one is higher in fat, so it's the richest meal in the book."
  },
  {
    id: "greek-chicken-souvlaki-bowl",
    name: "Greek Chicken Souvlaki Bowl with Tzatziki",
    category: "Dinner",
    tags: ["chicken", "mediterranean", "meal-prep"],
    vegetarian: false,
    time: { prep: 15, cook: 15 },
    macros: { protein: 70, netCarbs: 10, fat: 22, fiber: 3, calories: 500 },
    ingredients: [
      { item: "Chicken breast", qty: 200, unit: "g", aisle: "Meat & Poultry" },
      { item: "Plain 0% Greek yogurt", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Cherry tomatoes", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Mixed greens", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Kalamata olives", qty: 5, unit: "", aisle: "Condiments & Spices" },
      { item: "Olive oil, lemon, oregano, garlic, dill", qty: 1, unit: "tbsp", aisle: "Pantry" }
    ],
    steps: [
      "Marinate cubed chicken in lemon, oregano, garlic and a little olive oil, then skewer and grill or pan-sear until charred and cooked.",
      "Make tzatziki: mix Greek yogurt with grated cucumber, garlic, dill and lemon.",
      "Build the bowl with greens, tomatoes, olives, the chicken and a generous spoon of tzatziki."
    ],
    notes: "The tzatziki sneaks extra protein from Greek yogurt into a classic sauce. Doubles as a great meal-prep bowl."
  },

  /* ========================= SNACKS / LIGHT ========================= */
  {
    id: "cottage-cheese-cucumber-plate",
    name: "Cottage Cheese & Cucumber Protein Plate",
    category: "Snack",
    tags: ["no-cook", "vegetarian", "5-min", "office"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 71, netCarbs: 12, fat: 28, fiber: 3, calories: 520 },
    ingredients: [
      { item: "Low-fat cottage cheese", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "String cheese", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Pumpkin seeds", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Cucumber & cherry tomatoes", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Everything bagel seasoning", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Scoop cottage cheese onto a plate and dust with everything bagel seasoning.",
      "Add halved eggs, string cheese, pumpkin seeds and fresh vegetables.",
      "Eat as a graze-style plate."
    ],
    notes: "A 'big snack' that's really a full 70 g protein mini-meal. Stacks four dairy/egg protein sources, no cooking."
  },
  {
    id: "greek-yogurt-protein-mousse",
    name: "Cocoa Greek Yogurt Protein Mousse",
    category: "Snack",
    tags: ["no-cook", "vegetarian", "dessert", "whey"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 16, fat: 6, fiber: 3, calories: 380 },
    ingredients: [
      { item: "Plain 0% Greek yogurt", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Chocolate whey protein powder", qty: 36, unit: "g", aisle: "Supplements" },
      { item: "Powdered peanut butter (PB2)", qty: 16, unit: "g", aisle: "Pantry" },
      { item: "Unsweetened cocoa powder", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Stevia or monk fruit", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Whip the Greek yogurt with whey, PB powder and cocoa until thick and smooth.",
      "Sweeten to taste and chill 10 minutes for a mousse texture."
    ],
    notes: "A dessert that's secretly 70 g protein and almost no fat. Add a few berries on top if you have carb room."
  },
  {
    id: "tuna-stuffed-avocado",
    name: "Tuna-Stuffed Avocado",
    category: "Snack",
    tags: ["no-cook", "tuna", "low-carb-star", "5-min"],
    vegetarian: false,
    time: { prep: 8, cook: 0 },
    macros: { protein: 71, netCarbs: 6, fat: 30, fiber: 10, calories: 520 },
    ingredients: [
      { item: "Canned tuna in water (drained)", qty: 240, unit: "g", aisle: "Pantry" },
      { item: "Large egg (hard-boiled)", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Avocado", qty: 1, unit: "", aisle: "Produce" },
      { item: "Plain 0% Greek yogurt", qty: 50, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Red onion & celery", qty: 40, unit: "g", aisle: "Produce" },
      { item: "Lemon, Dijon, salt, pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Halve and pit the avocado; scoop out a little to make room.",
      "Mix tuna with chopped egg, Greek yogurt, mustard, lemon, onion and celery.",
      "Pile the tuna salad into the avocado halves, including the scooped flesh."
    ],
    notes: "Avocado provides 10 g of fiber, which is why net carbs stay at ~6 g despite the whole fruit."
  },
  {
    id: "turkey-cheese-snack-box",
    name: "Turkey & Cheese Roll-Up Snack Box",
    category: "Snack",
    tags: ["no-cook", "turkey", "portable", "5-min"],
    vegetarian: false,
    time: { prep: 8, cook: 0 },
    macros: { protein: 70, netCarbs: 8, fat: 38, fiber: 2, calories: 580 },
    ingredients: [
      { item: "Smoked deli turkey", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Sharp cheddar cheese", qty: 60, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Olives", qty: 6, unit: "", aisle: "Condiments & Spices" },
      { item: "Cucumber & cherry tomatoes", qty: 100, unit: "g", aisle: "Produce" }
    ],
    steps: [
      "Roll slices of turkey around sticks of cheddar.",
      "Pack with halved hard-boiled eggs, olives and fresh vegetables.",
      "Assemble as a grab-and-go bento box."
    ],
    notes: "The ultimate portable high-protein box — no fridge-to-table cooking, travels well, and lands a full 70 g protein."
  },
  {
    id: "edamame-cottage-cheese-bowl",
    name: "Edamame & Cottage Cheese Bowl",
    category: "Snack",
    tags: ["vegetarian", "no-cook", "fiber"],
    vegetarian: true,
    time: { prep: 5, cook: 3 },
    macros: { protein: 70, netCarbs: 19, fat: 22, fiber: 9, calories: 520 },
    ingredients: [
      { item: "Low-fat cottage cheese", qty: 320, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Shelled edamame", qty: 130, unit: "g", aisle: "Frozen" },
      { item: "Hemp hearts", qty: 35, unit: "g", aisle: "Pantry" },
      { item: "Pumpkin seeds", qty: 30, unit: "g", aisle: "Pantry" },
      { item: "Chili flakes, salt, lemon", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Warm the edamame for 2-3 min until tender.",
      "Spoon cottage cheese into a bowl, top with edamame, hemp hearts and pumpkin seeds.",
      "Season with chili flakes, salt and a squeeze of lemon."
    ],
    notes: "Plant + dairy combo with 9 g fiber. This one is at the top of the carb range (~19 g net) — still under the 20 g ceiling."
  },
  {
    id: "vanilla-almond-protein-shake",
    name: "Vanilla Almond Protein Shake with Skyr",
    category: "Snack",
    tags: ["vegetarian", "whey", "blender", "on-the-go"],
    vegetarian: true,
    time: { prep: 3, cook: 0 },
    macros: { protein: 70, netCarbs: 15, fat: 7, fiber: 1, calories: 400 },
    ingredients: [
      { item: "Vanilla whey protein powder", qty: 60, unit: "g", aisle: "Supplements" },
      { item: "Skyr or plain 0% Greek yogurt", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Unsweetened almond milk", qty: 250, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Almond butter", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Vanilla extract, cinnamon, ice", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Add everything to a blender.",
      "Blend until smooth and creamy; thin with more almond milk if needed."
    ],
    notes: "Skyr is an Icelandic strained yogurt that's even higher in protein than regular Greek yogurt. A fast recovery shake."
  },

  /* ===================== EXPANSION BATCH 1 ===================== */

  /* ---- Breakfast ---- */
  {
    id: "ham-cheese-egg-muffins",
    name: "Ham & Cheddar Egg-White Muffins",
    category: "Breakfast",
    tags: ["eggs", "ham", "meal-prep", "make-ahead"],
    vegetarian: false,
    time: { prep: 10, cook: 20 },
    macros: { protein: 70, netCarbs: 5, fat: 27, fiber: 1, calories: 520 },
    ingredients: [
      { item: "Large eggs", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Lean cooked ham", qty: 100, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cheddar cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Baby spinach", qty: 40, unit: "g", aisle: "Produce" },
      { item: "Salt, pepper & chives", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 180°C (350°F) and grease a 6-cup muffin tin.",
      "Whisk the eggs and egg whites; stir in diced ham, grated cheddar and chopped spinach; season.",
      "Divide between the cups and bake 18-20 min until set and springy.",
      "Cool slightly; eat warm or refrigerate for grab-and-go breakfasts."
    ],
    notes: "Makes the whole batch = one 70 g serving, or split across the week. Egg whites push protein up without extra fat."
  },
  {
    id: "cottage-cheese-protein-waffles",
    name: "Cottage Cheese Protein Waffles",
    category: "Breakfast",
    tags: ["cottage", "whey", "high-protein", "kid-friendly"],
    vegetarian: true,
    time: { prep: 8, cook: 8 },
    macros: { protein: 70, netCarbs: 13, fat: 16, fiber: 4, calories: 480 },
    ingredients: [
      { item: "Low-fat cottage cheese", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 30, unit: "g", aisle: "Supplements" },
      { item: "Almond flour", qty: 30, unit: "g", aisle: "Pantry" },
      { item: "Baking powder", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Cinnamon & sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Blend cottage cheese, eggs, whey, almond flour and baking powder into a smooth batter.",
      "Cook in a hot greased waffle iron (or as pancakes) until golden, 3-4 min per batch.",
      "Top with extra cottage cheese or a few berries."
    ],
    notes: "Blending the cottage cheese makes the waffles light and hides the curds. Freeze leftovers and toast to reheat."
  },
  {
    id: "turkey-egg-pepper-skillet",
    name: "Ground Turkey, Egg & Pepper Breakfast Skillet",
    category: "Breakfast",
    tags: ["turkey", "eggs", "one-pan", "whole30-ish"],
    vegetarian: false,
    time: { prep: 8, cook: 14 },
    macros: { protein: 70, netCarbs: 8, fat: 30, fiber: 3, calories: 560 },
    ingredients: [
      { item: "Lean ground turkey (93%)", qty: 200, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large eggs", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Bell pepper", qty: 1, unit: "", aisle: "Produce" },
      { item: "Onion", qty: 40, unit: "g", aisle: "Produce" },
      { item: "Cheddar cheese", qty: 20, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olive oil", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Smoked paprika, salt & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Brown the turkey in olive oil over medium-high heat, breaking it up, 5-6 min.",
      "Add diced pepper and onion; cook until softened, season with paprika.",
      "Make three wells, crack in the eggs, cover and cook to your liking.",
      "Scatter cheddar over the top and serve from the pan."
    ],
    notes: "A savory, sturdy breakfast. Swap turkey for lean beef if you prefer."
  },
  {
    id: "high-protein-tofu-scramble",
    name: "High-Protein Tofu Scramble with Edamame & Hemp",
    category: "Breakfast",
    tags: ["tofu", "vegan", "edamame", "plant-based"],
    vegetarian: true,
    time: { prep: 8, cook: 10 },
    macros: { protein: 70, netCarbs: 9, fat: 30, fiber: 9, calories: 560 },
    ingredients: [
      { item: "Extra-firm tofu", qty: 320, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Shelled edamame", qty: 100, unit: "g", aisle: "Frozen" },
      { item: "Hemp seeds", qty: 30, unit: "g", aisle: "Pantry" },
      { item: "Nutritional yeast", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Baby spinach", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Turmeric, garlic powder, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Crumble the tofu and pat dry. Fry in olive oil over medium-high heat until golden, 5 min.",
      "Stir in turmeric, garlic powder and salt for a 'scrambled egg' colour and flavour.",
      "Add edamame and spinach; cook until wilted.",
      "Off the heat, fold in nutritional yeast and hemp seeds. Serve hot."
    ],
    notes: "A genuinely 70 g plant-based breakfast — tofu, edamame, hemp and nutritional yeast stack the protein. Fully vegan."
  },

  /* ---- Lunch ---- */
  {
    id: "chicken-shawarma-salad-bowl",
    name: "Chicken Shawarma Salad Bowl",
    category: "Lunch",
    tags: ["chicken", "meal-prep", "mediterranean", "quick"],
    vegetarian: false,
    time: { prep: 12, cook: 12 },
    macros: { protein: 70, netCarbs: 11, fat: 22, fiber: 4, calories: 520 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "0% Greek yogurt", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Romaine lettuce", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Cucumber & tomato", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Olive oil", qty: 2, unit: "tsp", aisle: "Pantry" },
      { item: "Shawarma spice (cumin, coriander, paprika, garlic)", qty: null, unit: "to taste", aisle: "Condiments & Spices" },
      { item: "Lemon juice", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Toss sliced chicken with the spices and 1 tsp oil; sear in a hot pan until cooked through, 8-10 min.",
      "Whisk the yogurt with lemon, garlic and a little water for a quick sauce.",
      "Build a bowl of romaine, cucumber and tomato; top with the chicken and yogurt sauce."
    ],
    notes: "All the shawarma flavour, none of the wrap. The yogurt sauce adds a little extra protein too."
  },
  {
    id: "seared-tuna-nicoise-salad",
    name: "Seared Tuna Niçoise-Style Salad",
    category: "Lunch",
    tags: ["tuna", "eggs", "no-cook-ish", "mediterranean"],
    vegetarian: false,
    time: { prep: 12, cook: 6 },
    macros: { protein: 70, netCarbs: 9, fat: 22, fiber: 4, calories: 500 },
    ingredients: [
      { item: "Fresh tuna steak", qty: 220, unit: "g", aisle: "Seafood" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Green beans", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Cherry tomatoes", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Black olives", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Olive oil & red wine vinegar", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Dijon, salt & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Sear the seasoned tuna 1-2 min per side for rare, or longer to taste; rest then slice.",
      "Blanch the green beans 2-3 min and cool under cold water.",
      "Arrange beans, halved tomatoes, olives and quartered eggs; top with the tuna.",
      "Whisk oil, vinegar and Dijon into a dressing and spoon over."
    ],
    notes: "A protein-dense take on the French classic, with the potatoes left out to keep carbs low."
  },
  {
    id: "buffalo-chicken-lettuce-cups",
    name: "Buffalo Chicken Lettuce Cups",
    category: "Lunch",
    tags: ["chicken", "quick", "spicy", "low-carb"],
    vegetarian: false,
    time: { prep: 10, cook: 10 },
    macros: { protein: 70, netCarbs: 6, fat: 22, fiber: 2, calories: 500 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Hot sauce (Frank's-style)", qty: 2, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Blue cheese or Greek yogurt dip", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Little gem lettuce", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Celery & carrot sticks", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Butter", qty: 1, unit: "tsp", aisle: "Eggs & Dairy" }
    ],
    steps: [
      "Cook the diced chicken in a hot pan until done, 8-10 min.",
      "Melt the butter with the hot sauce and toss the chicken to coat.",
      "Spoon into lettuce cups; drizzle with the blue cheese or yogurt dip and serve with crudités."
    ],
    notes: "Game-day flavour at 70 g protein. Use Greek-yogurt dip to keep it leaner."
  },
  {
    id: "smoked-mackerel-egg-salad-plate",
    name: "Smoked Mackerel & Egg Protein Plate",
    category: "Lunch",
    tags: ["mackerel", "eggs", "no-cook", "high-omega3"],
    vegetarian: false,
    time: { prep: 8, cook: 0 },
    macros: { protein: 70, netCarbs: 5, fat: 40, fiber: 2, calories: 600 },
    ingredients: [
      { item: "Smoked mackerel fillets", qty: 150, unit: "g", aisle: "Seafood" },
      { item: "Large eggs (hard-boiled)", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber & radish", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Lemon, dill & black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Flake the mackerel onto a plate and add the halved eggs.",
      "Spoon the cottage cheese alongside and add sliced cucumber and radish.",
      "Finish with lemon, dill and pepper. No cooking required."
    ],
    notes: "Oily fish brings omega-3s; the eggs and cottage cheese round it out to 70 g. Higher in healthy fats."
  },
  {
    id: "cottage-tuna-stuffed-peppers",
    name: "Tuna & Cottage Cheese Stuffed Peppers",
    category: "Lunch",
    tags: ["tuna", "cottage", "no-cook", "lean"],
    vegetarian: false,
    time: { prep: 10, cook: 0 },
    macros: { protein: 70, netCarbs: 12, fat: 12, fiber: 4, calories: 440 },
    ingredients: [
      { item: "Canned tuna in water (drained)", qty: 200, unit: "g", aisle: "Pantry" },
      { item: "Low-fat cottage cheese", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Parmesan cheese", qty: 10, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Bell peppers", qty: 2, unit: "", aisle: "Produce" },
      { item: "Spring onion & parsley", qty: 30, unit: "g", aisle: "Produce" },
      { item: "Lemon, salt & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mix the drained tuna with cottage cheese, grated parmesan, sliced spring onion and parsley; season.",
      "Halve and deseed the peppers.",
      "Pile the filling into the pepper halves and serve, or warm briefly under a grill."
    ],
    notes: "One of the leanest meals in the book — 70 g protein for ~440 kcal. Great for a cut."
  },

  /* ---- Dinner ---- */
  {
    id: "garlic-herb-roast-chicken-cauli-mash",
    name: "Garlic-Herb Chicken with Cauliflower Mash",
    category: "Dinner",
    tags: ["chicken", "comfort", "low-carb", "classic"],
    vegetarian: false,
    time: { prep: 10, cook: 22 },
    macros: { protein: 70, netCarbs: 11, fat: 20, fiber: 5, calories: 500 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cauliflower", qty: 250, unit: "g", aisle: "Produce" },
      { item: "Light cream cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Garlic", qty: 2, unit: "", aisle: "Produce" },
      { item: "Olive oil", qty: 2, unit: "tsp", aisle: "Pantry" },
      { item: "Rosemary, thyme, salt & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Rub the chicken with oil, crushed garlic and herbs; roast or pan-sear until 74°C internal, ~18-22 min.",
      "Meanwhile steam the cauliflower until very tender, 10-12 min.",
      "Blend the cauliflower with cream cheese and seasoning into a smooth mash.",
      "Slice the chicken and serve over the mash."
    ],
    notes: "Cauliflower mash gives you the comfort of mash at a fraction of the carbs."
  },
  {
    id: "pan-seared-salmon-creamed-spinach",
    name: "Pan-Seared Salmon with Creamed Spinach",
    category: "Dinner",
    tags: ["salmon", "high-omega3", "low-carb", "date-night"],
    vegetarian: false,
    time: { prep: 8, cook: 14 },
    macros: { protein: 70, netCarbs: 7, fat: 40, fiber: 3, calories: 600 },
    ingredients: [
      { item: "Salmon fillet", qty: 250, unit: "g", aisle: "Seafood" },
      { item: "Baby spinach", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Parmesan cheese", qty: 25, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Light cream cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Garlic", qty: 1, unit: "", aisle: "Produce" },
      { item: "Olive oil, salt & pepper", qty: 1, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Season the salmon and sear skin-side down in a little oil until crisp, then flip to finish, ~8-10 min total.",
      "In the same pan, soften garlic, add spinach and wilt.",
      "Stir in cream cheese and parmesan to make a quick creamed spinach; loosen with a splash of water.",
      "Serve the salmon on the creamed spinach."
    ],
    notes: "Rich and restaurant-feeling. Higher in healthy fats from the salmon, so calories are on the higher side."
  },
  {
    id: "turkey-meatballs-marinara-zoodles",
    name: "Turkey Meatballs in Marinara with Zoodles",
    category: "Dinner",
    tags: ["turkey", "italian", "meal-prep", "low-carb"],
    vegetarian: false,
    time: { prep: 15, cook: 18 },
    macros: { protein: 70, netCarbs: 13, fat: 24, fiber: 5, calories: 540 },
    ingredients: [
      { item: "Lean ground turkey (93%)", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large egg", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Parmesan cheese", qty: 15, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Almond flour", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Marinara (no sugar added)", qty: 150, unit: "g", aisle: "Pantry" },
      { item: "Zucchini (spiralized)", qty: 200, unit: "g", aisle: "Produce" },
      { item: "Italian herbs, garlic, salt", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mix turkey, egg, parmesan, almond flour and seasoning; roll into meatballs.",
      "Brown the meatballs in a pan, then add marinara and simmer 10-12 min until cooked through.",
      "Quickly sauté or microwave the zoodles, then top with the meatballs and sauce."
    ],
    notes: "A weeknight staple. The almond flour binds the meatballs without grain-based breadcrumbs."
  },
  {
    id: "pork-chops-cabbage-mustard-cream",
    name: "Pork Chops with Savoy Cabbage & Mustard Cream",
    category: "Dinner",
    tags: ["pork", "low-carb", "comfort", "one-pan"],
    vegetarian: false,
    time: { prep: 8, cook: 18 },
    macros: { protein: 70, netCarbs: 9, fat: 32, fiber: 4, calories: 580 },
    ingredients: [
      { item: "Boneless pork loin chops", qty: 270, unit: "g", aisle: "Meat & Poultry" },
      { item: "Savoy cabbage", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Double cream", qty: 30, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Wholegrain mustard", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Butter", qty: 1, unit: "tsp", aisle: "Eggs & Dairy" },
      { item: "Olive oil, salt & pepper", qty: 1, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Season and sear the pork chops in oil until golden and cooked through, ~6-7 min per side; rest.",
      "In the same pan, melt butter and sauté shredded cabbage until tender.",
      "Add cream and mustard, bubble for a minute into a sauce.",
      "Serve the chops over the cabbage with the mustard cream spooned over."
    ],
    notes: "A little cream goes a long way; mustard cuts the richness. Pork loin keeps it lean and protein-dense."
  },
  {
    id: "sheet-pan-shrimp-fajita-bowl",
    name: "Sheet-Pan Shrimp Fajita Bowl",
    category: "Dinner",
    tags: ["shrimp", "sheet-pan", "mexican", "lean"],
    vegetarian: false,
    time: { prep: 12, cook: 12 },
    macros: { protein: 70, netCarbs: 14, fat: 12, fiber: 5, calories: 460 },
    ingredients: [
      { item: "Raw shrimp (peeled)", qty: 300, unit: "g", aisle: "Seafood" },
      { item: "Bell peppers", qty: 2, unit: "", aisle: "Produce" },
      { item: "Onion", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Olive oil", qty: 1, unit: "tbsp", aisle: "Pantry" },
      { item: "Fajita spice (chili, cumin, paprika)", qty: null, unit: "to taste", aisle: "Condiments & Spices" },
      { item: "Lime & coriander", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Heat oven to 220°C (425°F). Toss peppers and onion with oil and half the spice; roast 8 min.",
      "Add the spiced shrimp to the tray and roast a further 6-8 min until pink.",
      "Warm the cauliflower rice and pile everything into a bowl; finish with lime and coriander."
    ],
    notes: "Big volume, low calories — 70 g protein for ~460 kcal. Add avocado if you want more healthy fat."
  },
  {
    id: "bunless-cheeseburger-bowl",
    name: "Bunless Cheeseburger Bowl",
    category: "Dinner",
    tags: ["beef", "quick", "low-carb", "comfort"],
    vegetarian: false,
    time: { prep: 10, cook: 12 },
    macros: { protein: 70, netCarbs: 7, fat: 40, fiber: 3, calories: 610 },
    ingredients: [
      { item: "Lean ground beef (90%)", qty: 240, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cheddar cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Shredded lettuce", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Tomato & pickles", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Light mayo & mustard", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Salt, pepper & onion powder", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Brown the seasoned beef in a hot pan until cooked, 6-8 min; melt the cheddar over it.",
      "Build a bowl of lettuce, tomato and pickles.",
      "Add the cheesy beef and drizzle with a quick 'burger sauce' of mayo and mustard."
    ],
    notes: "All the cheeseburger satisfaction, no bun. Use 95% beef to trim the fat and calories."
  },

  /* ---- Snack ---- */
  {
    id: "roast-beef-cream-cheese-rollups",
    name: "Roast Beef & Cream Cheese Roll-Ups",
    category: "Snack",
    tags: ["beef", "no-cook", "5-min", "low-carb"],
    vegetarian: false,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 4, fat: 30, fiber: 1, calories: 540 },
    ingredients: [
      { item: "Sliced roast beef (deli)", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Light cream cheese", qty: 60, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cheddar or Swiss cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber spears", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Black pepper & chives", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Spread each slice of roast beef with a little cream cheese.",
      "Lay a cheese strip and a cucumber spear on top and roll up.",
      "Season with pepper and chives. Eat straight away or pack for later."
    ],
    notes: "A savory, portable 70 g snack with almost no carbs. Look for low-sodium roast beef if you watch salt."
  },
  {
    id: "protein-cheesecake-quark-cup",
    name: "No-Bake Protein Cheesecake Cup",
    category: "Snack",
    tags: ["quark", "whey", "dessert", "yogurt"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 10, fat: 6, fiber: 1, calories: 380 },
    ingredients: [
      { item: "Quark (or fat-free fromage frais)", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "Lemon juice & zest", qty: null, unit: "to taste", aisle: "Produce" },
      { item: "A few raspberries", qty: 40, unit: "g", aisle: "Produce" },
      { item: "Sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Whisk the quark with the whey, lemon and sweetener until thick and smooth.",
      "Spoon into a cup or glass and top with the raspberries.",
      "Chill for 10 minutes if you have time, for a firmer cheesecake texture."
    ],
    notes: "Tastes like dessert, lands at 70 g protein for under 400 kcal. Quark is the secret weapon here."
  },
  {
    id: "whipped-cottage-berry-protein-pot",
    name: "Whipped Cottage Cheese & Berry Protein Pot",
    category: "Snack",
    tags: ["cottage", "whey", "no-cook", "yogurt"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 12, fat: 8, fiber: 3, calories: 420 },
    ingredients: [
      { item: "Low-fat cottage cheese", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "0% Greek yogurt", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 25, unit: "g", aisle: "Supplements" },
      { item: "Mixed berries", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Chia or pumpkin seeds", qty: 10, unit: "g", aisle: "Pantry" }
    ],
    steps: [
      "Blend the cottage cheese, yogurt and whey until silky and whipped.",
      "Spoon into a pot or jar.",
      "Top with the berries and seeds. Keeps overnight for a grab-and-go snack."
    ],
    notes: "Whipping the cottage cheese transforms the texture into something mousse-like. A satisfying high-protein sweet-savory pot."
  },

  /* ===================== EXPANSION BATCH 2 ===================== */

  /* ---- Breakfast ---- */
  {
    id: "chorizo-egg-breakfast-bowl",
    name: "Spanish Chorizo & Egg Breakfast Bowl",
    category: "Breakfast",
    tags: ["eggs", "chorizo", "spanish", "one-pan"],
    vegetarian: false,
    time: { prep: 8, cook: 12 },
    macros: { protein: 70, netCarbs: 5, fat: 35, fiber: 2, calories: 615 },
    ingredients: [
      { item: "Large eggs", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Lean cooking chorizo", qty: 90, unit: "g", aisle: "Meat & Poultry" },
      { item: "Manchego or cheddar", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Red pepper & onion", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Smoked paprika & parsley", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Crisp the sliced chorizo in a dry pan, then add diced pepper and onion and soften.",
      "Pour in the whisked eggs and egg whites; stir gently to soft scramble.",
      "Fold through the cheese, scatter with parsley and serve in a bowl."
    ],
    notes: "Chorizo brings smoky flavour and fat, so this one is richer; pair with a light lunch."
  },
  {
    id: "smoked-salmon-cream-cheese-omelette",
    name: "Smoked Salmon & Cream Cheese Omelette",
    category: "Breakfast",
    tags: ["eggs", "salmon", "high-omega3", "quick"],
    vegetarian: false,
    time: { prep: 5, cook: 8 },
    macros: { protein: 70, netCarbs: 4, fat: 30, fiber: 1, calories: 566 },
    ingredients: [
      { item: "Large eggs", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Smoked salmon", qty: 120, unit: "g", aisle: "Seafood" },
      { item: "Light cream cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Chives & black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Whisk the eggs and egg whites; pour into a hot non-stick pan.",
      "As it sets, dot with cream cheese and lay the smoked salmon over half.",
      "Fold and slide onto a plate; finish with chives and pepper."
    ],
    notes: "An elegant, low-carb breakfast that eats like brunch. Great with a squeeze of lemon."
  },
  {
    id: "chocolate-protein-chia-pudding",
    name: "Chocolate Protein Chia Pudding",
    category: "Breakfast",
    tags: ["chia", "whey", "yogurt", "make-ahead"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 12, fat: 14, fiber: 8, calories: 454 },
    ingredients: [
      { item: "0% Greek yogurt", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Chocolate whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "Chia seeds", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Unsweetened almond milk", qty: 120, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Cocoa powder & sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Stir the yogurt, whey, cocoa and almond milk until smooth.",
      "Mix in the chia seeds, then refrigerate at least 2 hours (or overnight).",
      "Stir again before eating; thin with a splash of milk if needed."
    ],
    notes: "Make a few jars on Sunday for grab-and-go breakfasts. Chia adds fiber and omega-3s."
  },
  {
    id: "greek-yogurt-granola-parfait",
    name: "Greek Yogurt Protein Parfait with Low-Carb Granola",
    category: "Breakfast",
    tags: ["yogurt", "whey", "no-cook", "quick"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 14, fat: 16, fiber: 5, calories: 480 },
    ingredients: [
      { item: "0% Greek yogurt", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 35, unit: "g", aisle: "Supplements" },
      { item: "Low-carb granola (nut & seed)", qty: 30, unit: "g", aisle: "Pantry" },
      { item: "Mixed berries", qty: 60, unit: "g", aisle: "Produce" }
    ],
    steps: [
      "Stir the whey through the yogurt until smooth.",
      "Layer the protein yogurt, berries and granola in a glass.",
      "Repeat the layers and serve."
    ],
    notes: "Choose a nut-and-seed granola with no added sugar to keep carbs down. Quick and satisfying."
  },
  {
    id: "turkey-bacon-egg-white-wrap",
    name: "Turkey Bacon & Egg-White Breakfast Wrap",
    category: "Breakfast",
    tags: ["turkey", "eggs", "quick", "low-carb"],
    vegetarian: false,
    time: { prep: 5, cook: 10 },
    macros: { protein: 70, netCarbs: 6, fat: 22, fiber: 3, calories: 502 },
    ingredients: [
      { item: "Liquid egg whites", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Turkey bacon", qty: 60, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cheddar cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Low-carb tortilla", qty: 1, unit: "", aisle: "Pantry" },
      { item: "Spinach, salt & pepper", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Crisp the turkey bacon, then scramble the eggs and egg whites in the same pan.",
      "Warm the low-carb tortilla and add the eggs, bacon, cheese and spinach.",
      "Roll up tightly and toast seam-side down for a minute to seal."
    ],
    notes: "Use a high-fiber low-carb tortilla. Wrap in foil for a portable breakfast."
  },
  {
    id: "turkey-shakshuka-feta",
    name: "Turkey Shakshuka with Feta",
    category: "Breakfast",
    tags: ["turkey", "eggs", "middle-eastern", "one-pan"],
    vegetarian: false,
    time: { prep: 8, cook: 18 },
    macros: { protein: 70, netCarbs: 12, fat: 30, fiber: 4, calories: 598 },
    ingredients: [
      { item: "Lean ground turkey (93%)", qty: 150, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large eggs", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Feta cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Chopped tomatoes", qty: 150, unit: "g", aisle: "Pantry" },
      { item: "Pepper, onion & garlic", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Cumin, paprika & chili", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Brown the turkey with onion, pepper, garlic and spices.",
      "Add the tomatoes and simmer into a thick sauce, 8-10 min.",
      "Make wells, crack in the eggs, cover and cook until the whites set.",
      "Crumble feta over the top and serve from the pan."
    ],
    notes: "A protein-boosted shakshuka — the ground turkey turns brunch into a serious 70 g meal."
  },
  {
    id: "protein-french-toast",
    name: "Protein French Toast",
    category: "Breakfast",
    tags: ["eggs", "whey", "kid-friendly"],
    vegetarian: true,
    time: { prep: 6, cook: 8 },
    macros: { protein: 70, netCarbs: 15, fat: 14, fiber: 4, calories: 466 },
    ingredients: [
      { item: "High-protein / low-carb bread", qty: 2, unit: "slices", aisle: "Pantry" },
      { item: "Large eggs", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 30, unit: "g", aisle: "Supplements" },
      { item: "0% Greek yogurt", qty: 120, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Unsweetened almond milk", qty: 60, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Cinnamon & sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Whisk the eggs, half the whey, milk and cinnamon into a custard.",
      "Soak the bread, then cook in a greased non-stick pan until golden both sides.",
      "Stir the remaining whey into the yogurt and dollop on top as a protein cream."
    ],
    notes: "Use a dense high-protein bread so it soaks without falling apart. Tastes indulgent, eats clean."
  },
  {
    id: "cottage-eggs-smoked-salmon",
    name: "Cottage-Scrambled Eggs with Smoked Salmon",
    category: "Breakfast",
    tags: ["eggs", "salmon", "cottage", "quick"],
    vegetarian: false,
    time: { prep: 4, cook: 8 },
    macros: { protein: 70, netCarbs: 4, fat: 26, fiber: 1, calories: 530 },
    ingredients: [
      { item: "Large eggs", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Smoked salmon", qty: 120, unit: "g", aisle: "Seafood" },
      { item: "Butter, chives & pepper", qty: 1, unit: "tsp", aisle: "Eggs & Dairy" }
    ],
    steps: [
      "Whisk the eggs and egg whites; scramble gently in butter over low heat.",
      "When almost set, stir through the cottage cheese for an extra-creamy curd.",
      "Top with the smoked salmon, chives and black pepper."
    ],
    notes: "Folding cottage cheese into scrambled eggs is a classic protein hack — creamy and rich without cream."
  },
  {
    id: "kimchi-egg-tofu-scramble",
    name: "Korean Kimchi, Egg & Tofu Scramble",
    category: "Breakfast",
    tags: ["tofu", "eggs", "korean", "kimchi"],
    vegetarian: true,
    time: { prep: 6, cook: 10 },
    macros: { protein: 70, netCarbs: 8, fat: 26, fiber: 4, calories: 546 },
    ingredients: [
      { item: "Extra-firm tofu", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Liquid egg whites", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Kimchi", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Sesame oil & spring onion", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Soy sauce or tamari", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Crumble and fry the tofu in sesame oil until lightly golden.",
      "Add chopped kimchi and warm through, then pour in the whisked eggs and whites.",
      "Scramble until just set; finish with spring onion and a dash of soy."
    ],
    notes: "Spicy, savory and gut-friendly thanks to the kimchi. Vegetarian and very high protein."
  },

  /* ---- Lunch ---- */
  {
    id: "carnitas-pork-cauli-bowl",
    name: "Pork Carnitas Cauliflower-Rice Bowl",
    category: "Lunch",
    tags: ["pork", "mexican", "meal-prep", "low-carb"],
    vegetarian: false,
    time: { prep: 10, cook: 15 },
    macros: { protein: 70, netCarbs: 12, fat: 28, fiber: 5, calories: 580 },
    ingredients: [
      { item: "Cooked pulled pork (lean)", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Cheddar cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Avocado", qty: 50, unit: "g", aisle: "Produce" },
      { item: "Salsa & lime", qty: 40, unit: "g", aisle: "Produce" },
      { item: "Cumin, oregano & chili", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Crisp the pulled pork in a hot pan with the spices until the edges char.",
      "Warm the cauliflower rice and build a bowl.",
      "Top with pork, cheese, avocado, salsa and a squeeze of lime."
    ],
    notes: "Use leftover slow-cooked pork shoulder trimmed of fat, or a lean shop-bought pulled pork."
  },
  {
    id: "teriyaki-salmon-poke-bowl",
    name: "Teriyaki Salmon Poke Bowl",
    category: "Lunch",
    tags: ["salmon", "japanese", "poke", "high-omega3"],
    vegetarian: false,
    time: { prep: 12, cook: 8 },
    macros: { protein: 70, netCarbs: 14, fat: 26, fiber: 5, calories: 570 },
    ingredients: [
      { item: "Salmon fillet", qty: 280, unit: "g", aisle: "Seafood" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Shelled edamame", qty: 80, unit: "g", aisle: "Frozen" },
      { item: "Cucumber & spring onion", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Sugar-free teriyaki & sesame", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Cube and sear the salmon (or bake), glazing with the teriyaki.",
      "Warm the cauliflower rice and edamame and add to a bowl.",
      "Top with salmon, cucumber, spring onion and a sprinkle of sesame."
    ],
    notes: "A poke-style bowl over cauliflower rice keeps it low-carb while staying fresh and bright."
  },
  {
    id: "thai-beef-larb-lettuce-cups",
    name: "Thai Beef Larb Lettuce Cups",
    category: "Lunch",
    tags: ["beef", "thai", "low-carb", "quick"],
    vegetarian: false,
    time: { prep: 10, cook: 10 },
    macros: { protein: 70, netCarbs: 8, fat: 30, fiber: 3, calories: 582 },
    ingredients: [
      { item: "Lean ground beef (90%)", qty: 270, unit: "g", aisle: "Meat & Poultry" },
      { item: "Little gem lettuce", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Lime, fish sauce & chili", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Mint, coriander & shallot", qty: 40, unit: "g", aisle: "Produce" },
      { item: "Toasted sesame or rice-free seeds", qty: 10, unit: "g", aisle: "Pantry" }
    ],
    steps: [
      "Brown the beef over high heat until well caramelised.",
      "Off the heat, toss with lime, fish sauce, chili and the herbs.",
      "Spoon into lettuce cups and finish with seeds."
    ],
    notes: "Bright, herby and punchy. Swap beef for ground chicken or turkey if you like."
  },
  {
    id: "chicken-tikka-salad-bowl",
    name: "Chicken Tikka Salad Bowl",
    category: "Lunch",
    tags: ["chicken", "indian", "meal-prep", "lean"],
    vegetarian: false,
    time: { prep: 12, cook: 12 },
    macros: { protein: 70, netCarbs: 10, fat: 18, fiber: 4, calories: 482 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "0% Greek yogurt", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Mixed salad leaves", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Cucumber, tomato & red onion", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Tikka spice (garam masala, cumin, paprika)", qty: null, unit: "to taste", aisle: "Condiments & Spices" },
      { item: "Lemon & mint", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Marinate the diced chicken in half the yogurt and the tikka spices, then grill or pan-cook.",
      "Thin the remaining yogurt with lemon and mint for a raita dressing.",
      "Pile the salad into a bowl, add the chicken and drizzle with the raita."
    ],
    notes: "Lean and fragrant. Make extra chicken for tomorrow's lunch."
  },
  {
    id: "korean-beef-bulgogi-cauli-bowl",
    name: "Korean Beef Bulgogi Cauliflower Bowl",
    category: "Lunch",
    tags: ["beef", "korean", "meal-prep", "low-carb"],
    vegetarian: false,
    time: { prep: 12, cook: 10 },
    macros: { protein: 70, netCarbs: 13, fat: 26, fiber: 4, calories: 566 },
    ingredients: [
      { item: "Lean beef strips", qty: 270, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Kimchi", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Soy sauce, garlic, ginger & sesame", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Spring onion", qty: 20, unit: "g", aisle: "Produce" }
    ],
    steps: [
      "Marinate the beef in soy, garlic, ginger and a little sweetener, then sear hot and fast.",
      "Warm the cauliflower rice and top with the beef.",
      "Add kimchi, spring onion and a sprinkle of sesame."
    ],
    notes: "Big Korean BBQ flavour without the sugar or rice. Sub sweetener for the usual sugar in the marinade."
  },
  {
    id: "greek-chicken-salad-bowl",
    name: "Greek Chicken & Feta Salad Bowl",
    category: "Lunch",
    tags: ["chicken", "greek", "mediterranean", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 12 },
    macros: { protein: 70, netCarbs: 9, fat: 24, fiber: 4, calories: 532 },
    ingredients: [
      { item: "Chicken breast", qty: 200, unit: "g", aisle: "Meat & Poultry" },
      { item: "Feta cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber, tomato & olives", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Red onion", qty: 30, unit: "g", aisle: "Produce" },
      { item: "Olive oil, oregano & lemon", qty: 2, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Season and grill the chicken with oregano; slice.",
      "Toss cucumber, tomato, olives and onion with olive oil and lemon.",
      "Top with the chicken and crumbled feta."
    ],
    notes: "Sunshine on a plate. The feta adds a little extra protein and a salty hit."
  },
  {
    id: "turkey-club-lettuce-wrap",
    name: "Turkey Club Lettuce Wrap",
    category: "Lunch",
    tags: ["turkey", "eggs", "no-cook-ish", "low-carb"],
    vegetarian: false,
    time: { prep: 8, cook: 5 },
    macros: { protein: 70, netCarbs: 6, fat: 26, fiber: 3, calories: 538 },
    ingredients: [
      { item: "Sliced turkey breast (deli)", qty: 200, unit: "g", aisle: "Meat & Poultry" },
      { item: "Turkey bacon", qty: 40, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large egg (hard-boiled)", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Cheddar or Swiss cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large lettuce leaves, tomato", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Light mayo & mustard", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Crisp the turkey bacon and slice the hard-boiled egg.",
      "Layer turkey, bacon, cheese, egg and tomato onto large lettuce leaves.",
      "Add a little mayo-mustard, roll up and eat like a wrap."
    ],
    notes: "All the club-sandwich flavours, bread swapped for crunchy lettuce."
  },
  {
    id: "italian-antipasto-protein-plate",
    name: "Italian Antipasto Protein Plate",
    category: "Lunch",
    tags: ["turkey", "italian", "no-cook", "5-min"],
    vegetarian: false,
    time: { prep: 8, cook: 0 },
    macros: { protein: 70, netCarbs: 5, fat: 30, fiber: 2, calories: 570 },
    ingredients: [
      { item: "Prosciutto", qty: 70, unit: "g", aisle: "Meat & Poultry" },
      { item: "Sliced turkey breast (deli)", qty: 100, unit: "g", aisle: "Meat & Poultry" },
      { item: "Fresh mozzarella", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Parmesan shavings", qty: 20, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olives, cherry tomatoes & rocket", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Olive oil & balsamic", qty: 1, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Arrange the prosciutto, turkey, mozzarella and parmesan on a board or plate.",
      "Add olives, tomatoes and rocket.",
      "Drizzle with olive oil and a little balsamic. No cooking needed."
    ],
    notes: "A no-cook 'grazing' lunch. Pick leaner cured meats and part-skim mozzarella to manage the fat."
  },

  /* ===================== EXPANSION BATCH 3 ===================== */

  /* ---- Lunch ---- */
  {
    id: "edamame-tofu-poke-bowl",
    name: "Edamame & Tofu Poke Bowl",
    category: "Lunch",
    tags: ["tofu", "edamame", "vegan", "poke"],
    vegetarian: true,
    time: { prep: 12, cook: 8 },
    macros: { protein: 70, netCarbs: 13, fat: 28, fiber: 9, calories: 584 },
    ingredients: [
      { item: "Extra-firm tofu", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Shelled edamame", qty: 200, unit: "g", aisle: "Frozen" },
      { item: "Hemp seeds", qty: 30, unit: "g", aisle: "Pantry" },
      { item: "Cauliflower rice", qty: 120, unit: "g", aisle: "Frozen" },
      { item: "Cucumber, avocado & spring onion", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Soy sauce, sesame & lime", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Press and cube the tofu, then bake or pan-fry until golden.",
      "Warm the edamame and cauliflower rice; arrange in a bowl.",
      "Top with tofu, cucumber, avocado and spring onion; dress with soy, sesame and lime and scatter hemp seeds."
    ],
    notes: "A fully plant-based 70 g bowl — tofu, edamame and hemp do the heavy lifting."
  },
  {
    id: "halloumi-greek-salad-bowl",
    name: "Grilled Halloumi Greek Salad Bowl",
    category: "Lunch",
    tags: ["halloumi", "eggs", "greek", "vegetarian"],
    vegetarian: true,
    time: { prep: 10, cook: 8 },
    macros: { protein: 70, netCarbs: 9, fat: 40, fiber: 4, calories: 676 },
    ingredients: [
      { item: "Halloumi", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Parmesan", qty: 15, unit: "g", aisle: "Eggs & Dairy" },
      { item: "0% Greek yogurt", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber, tomato, olives & onion", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Olive oil, oregano & lemon", qty: 2, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Griddle the sliced halloumi until golden on both sides.",
      "Toss the salad vegetables with olive oil, oregano and lemon.",
      "Add the halloumi and quartered eggs; serve the yogurt alongside as a creamy dressing with the parmesan grated over."
    ],
    notes: "Halloumi is salty and high in protein but rich, so this is a higher-fat, vegetarian option."
  },
  {
    id: "prawn-egg-protein-salad",
    name: "Prawn & Egg Protein Salad",
    category: "Lunch",
    tags: ["prawn", "shrimp", "eggs", "lean"],
    vegetarian: false,
    time: { prep: 10, cook: 5 },
    macros: { protein: 70, netCarbs: 7, fat: 16, fiber: 3, calories: 452 },
    ingredients: [
      { item: "Cooked king prawns", qty: 200, unit: "g", aisle: "Seafood" },
      { item: "Large eggs (hard-boiled)", qty: 2, unit: "", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Little gem, cucumber & tomato", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Light mayo, lemon & dill", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Arrange the leaves, cucumber and tomato in a bowl.",
      "Top with the prawns and quartered eggs and spoon over the cottage cheese.",
      "Dress with a little lemon-dill mayo."
    ],
    notes: "One of the leanest, freshest lunches here — 70 g protein for about 450 kcal."
  },
  {
    id: "smoked-trout-egg-salad",
    name: "Smoked Trout & Egg Salad Plate",
    category: "Lunch",
    tags: ["trout", "eggs", "no-cook", "high-omega3"],
    vegetarian: false,
    time: { prep: 8, cook: 0 },
    macros: { protein: 70, netCarbs: 5, fat: 32, fiber: 2, calories: 588 },
    ingredients: [
      { item: "Hot-smoked trout fillets", qty: 150, unit: "g", aisle: "Seafood" },
      { item: "Large eggs (hard-boiled)", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Light cream cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Watercress, cucumber & radish", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Lemon, horseradish & dill", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Flake the trout onto a plate with the halved eggs.",
      "Mix the cream cheese with horseradish, lemon and dill for a quick sauce.",
      "Add the salad and cottage cheese; spoon the sauce over the trout."
    ],
    notes: "Trout is rich in omega-3s. A no-cook, picnic-friendly plate."
  },

  /* ---- Dinner ---- */
  {
    id: "beef-pepper-stir-fry",
    name: "Black Pepper Beef & Pepper Stir-Fry",
    category: "Dinner",
    tags: ["beef", "chinese", "quick", "low-carb"],
    vegetarian: false,
    time: { prep: 12, cook: 10 },
    macros: { protein: 70, netCarbs: 12, fat: 26, fiber: 4, calories: 562 },
    ingredients: [
      { item: "Lean beef strips", qty: 270, unit: "g", aisle: "Meat & Poultry" },
      { item: "Bell peppers & onion", qty: 160, unit: "g", aisle: "Produce" },
      { item: "Soy sauce, garlic & ginger", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Sesame oil", qty: 2, unit: "tsp", aisle: "Pantry" },
      { item: "Black pepper & spring onion", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Sear the beef in a screaming-hot wok in batches; set aside.",
      "Stir-fry the peppers and onion until just tender.",
      "Return the beef, add soy, garlic, ginger and plenty of black pepper; toss and serve."
    ],
    notes: "Skip the cornflour and sugar of takeout versions — the flavour is all in the high heat and pepper."
  },
  {
    id: "chicken-tikka-masala-cauli-rice",
    name: "Chicken Tikka Masala with Cauliflower Rice",
    category: "Dinner",
    tags: ["chicken", "indian", "meal-prep", "low-carb"],
    vegetarian: false,
    time: { prep: 12, cook: 20 },
    macros: { protein: 70, netCarbs: 13, fat: 24, fiber: 4, calories: 548 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "0% Greek yogurt", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Chopped tomatoes", qty: 120, unit: "g", aisle: "Pantry" },
      { item: "Double cream", qty: 20, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Garam masala, ginger & garlic", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Marinate the diced chicken in the yogurt and spices, then sear.",
      "Add tomatoes and simmer; stir in a little cream to finish the sauce.",
      "Serve over warm cauliflower rice."
    ],
    notes: "Greek yogurt in the marinade keeps it tender and adds protein; just a splash of cream for richness."
  },
  {
    id: "baked-haddock-parmesan-crust",
    name: "Parmesan-Crusted Baked Haddock",
    category: "Dinner",
    tags: ["haddock", "white-fish", "low-carb", "quick"],
    vegetarian: false,
    time: { prep: 8, cook: 16 },
    macros: { protein: 70, netCarbs: 6, fat: 20, fiber: 3, calories: 484 },
    ingredients: [
      { item: "Haddock fillets", qty: 280, unit: "g", aisle: "Seafood" },
      { item: "Parmesan cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Almond flour", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Large egg", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Broccoli", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Lemon, parsley & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 200°C (400°F). Brush the haddock with beaten egg.",
      "Press on a mix of parmesan and almond flour and bake 12-15 min until the crust is golden and the fish flakes.",
      "Steam the broccoli and serve with lemon."
    ],
    notes: "Parmesan and almond flour make a grain-free crust that crisps beautifully."
  },
  {
    id: "lamb-kofta-tzatziki",
    name: "Lamb Kofta with Tzatziki",
    category: "Dinner",
    tags: ["lamb", "middle-eastern", "grill", "low-carb"],
    vegetarian: false,
    time: { prep: 15, cook: 12 },
    macros: { protein: 70, netCarbs: 8, fat: 38, fiber: 3, calories: 654 },
    ingredients: [
      { item: "Lean ground lamb", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "0% Greek yogurt", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Feta cheese", qty: 20, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber, garlic & mint", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Cumin, coriander & paprika", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mix the lamb with the spices and a little grated onion; shape onto skewers.",
      "Grill or pan-cook the kofta until charred and cooked through.",
      "Stir grated cucumber, garlic and mint into the yogurt for tzatziki; crumble the feta over and serve."
    ],
    notes: "Lamb is naturally higher in fat, so this is a richer meal — balance the day around it."
  },
  {
    id: "teriyaki-chicken-broccoli",
    name: "Teriyaki Chicken & Broccoli",
    category: "Dinner",
    tags: ["chicken", "japanese", "quick", "lean"],
    vegetarian: false,
    time: { prep: 8, cook: 14 },
    macros: { protein: 70, netCarbs: 14, fat: 16, fiber: 4, calories: 480 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Broccoli", qty: 180, unit: "g", aisle: "Produce" },
      { item: "Sugar-free teriyaki sauce", qty: 2, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Sesame oil & seeds", qty: 1, unit: "tsp", aisle: "Pantry" },
      { item: "Garlic & ginger", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Sear the sliced chicken in sesame oil until golden.",
      "Add broccoli and a splash of water; cover and steam-fry until tender.",
      "Toss with teriyaki, garlic and ginger; finish with sesame seeds."
    ],
    notes: "A lean, fast weeknight stir-fry. Use a no-sugar teriyaki to keep carbs down."
  },
  {
    id: "pork-green-bean-stir-fry",
    name: "Szechuan Pork & Green Bean Stir-Fry",
    category: "Dinner",
    tags: ["pork", "chinese", "spicy", "quick"],
    vegetarian: false,
    time: { prep: 10, cook: 12 },
    macros: { protein: 70, netCarbs: 10, fat: 26, fiber: 4, calories: 554 },
    ingredients: [
      { item: "Lean pork strips", qty: 290, unit: "g", aisle: "Meat & Poultry" },
      { item: "Green beans", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Soy sauce, garlic & chili", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Sesame oil", qty: 2, unit: "tsp", aisle: "Pantry" },
      { item: "Spring onion & Szechuan pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Blister the green beans in a hot wok, then set aside.",
      "Stir-fry the pork until browned, add garlic and chili.",
      "Return the beans, splash in soy and toss; finish with spring onion."
    ],
    notes: "Punchy and fast. Dial the chili up or down to taste."
  },
  {
    id: "moroccan-spiced-chicken-cauli",
    name: "Moroccan-Spiced Chicken with Cauliflower",
    category: "Dinner",
    tags: ["chicken", "moroccan", "one-pan", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 22 },
    macros: { protein: 70, netCarbs: 12, fat: 22, fiber: 5, calories: 526 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cauliflower & courgette", qty: 200, unit: "g", aisle: "Produce" },
      { item: "0% Greek yogurt", qty: 60, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olive oil", qty: 2, unit: "tsp", aisle: "Pantry" },
      { item: "Ras el hanout, cumin & cinnamon", qty: null, unit: "to taste", aisle: "Condiments & Spices" },
      { item: "Lemon & coriander", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Toss chicken and vegetables with oil and the warm spices.",
      "Roast at 200°C (400°F) for ~20 min until the chicken is cooked and the veg caramelised.",
      "Serve with a dollop of yogurt, lemon and coriander."
    ],
    notes: "Warm North-African spices make lean chicken anything but boring."
  },
  {
    id: "steak-fajita-bowl",
    name: "Steak Fajita Bowl",
    category: "Dinner",
    tags: ["beef", "steak", "mexican", "low-carb"],
    vegetarian: false,
    time: { prep: 10, cook: 12 },
    macros: { protein: 70, netCarbs: 12, fat: 30, fiber: 5, calories: 598 },
    ingredients: [
      { item: "Sirloin or flank steak", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Bell peppers & onion", qty: 160, unit: "g", aisle: "Produce" },
      { item: "Cheddar cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cauliflower rice", qty: 120, unit: "g", aisle: "Frozen" },
      { item: "Fajita spice, lime & coriander", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Sear the seasoned steak to your liking; rest then slice against the grain.",
      "Char the peppers and onion in the same pan with fajita spice.",
      "Build a bowl with cauliflower rice, the steak and peppers, cheese, lime and coriander."
    ],
    notes: "All the sizzle of fajitas without the tortillas. Slice the steak thinly for tenderness."
  },
  {
    id: "seared-tuna-sesame-bok-choy",
    name: "Sesame-Seared Tuna with Bok Choy",
    category: "Dinner",
    tags: ["tuna", "asian", "lean", "quick"],
    vegetarian: false,
    time: { prep: 8, cook: 8 },
    macros: { protein: 70, netCarbs: 8, fat: 18, fiber: 3, calories: 474 },
    ingredients: [
      { item: "Fresh tuna steak", qty: 280, unit: "g", aisle: "Seafood" },
      { item: "Bok choy", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Soy sauce, ginger & garlic", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Sesame oil & seeds", qty: 2, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Coat the tuna in sesame seeds and sear 1-2 min per side for rare.",
      "Stir-fry the bok choy with ginger, garlic and soy until just wilted.",
      "Slice the tuna and serve over the greens."
    ],
    notes: "A lean, restaurant-style plate. Don't overcook the tuna — it's best pink in the middle."
  },
  {
    id: "chicken-cacciatore",
    name: "Chicken Cacciatore",
    category: "Dinner",
    tags: ["chicken", "italian", "comfort", "meal-prep"],
    vegetarian: false,
    time: { prep: 10, cook: 25 },
    macros: { protein: 70, netCarbs: 12, fat: 22, fiber: 4, calories: 526 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Chopped tomatoes", qty: 150, unit: "g", aisle: "Pantry" },
      { item: "Mushrooms, pepper & onion", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Parmesan cheese", qty: 20, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olive oil, garlic & herbs", qty: 2, unit: "tsp", aisle: "Pantry" }
    ],
    steps: [
      "Brown the chicken in olive oil, then set aside.",
      "Soften the mushrooms, pepper and onion; add garlic, herbs and tomatoes.",
      "Return the chicken and simmer until cooked and the sauce thickens; finish with parmesan."
    ],
    notes: "A rustic Italian braise that reheats brilliantly for lunches."
  },
  {
    id: "turkey-burger-slaw",
    name: "Cheesy Turkey Burgers with Slaw",
    category: "Dinner",
    tags: ["turkey", "comfort", "low-carb", "grill"],
    vegetarian: false,
    time: { prep: 12, cook: 12 },
    macros: { protein: 70, netCarbs: 8, fat: 28, fiber: 4, calories: 564 },
    ingredients: [
      { item: "Lean ground turkey (93%)", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large egg", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Cheddar cheese", qty: 30, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cabbage & carrot (slaw)", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Light mayo & mustard", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mix the turkey with the egg and seasoning; form patties and grill or pan-cook.",
      "Melt the cheddar over the patties in the last minute.",
      "Toss the shredded cabbage and carrot with mayo-mustard and serve alongside."
    ],
    notes: "Serve bunless over the slaw, or in a lettuce 'bun'. The egg keeps lean turkey juicy."
  },
  {
    id: "thai-shrimp-coconut-curry-cauli",
    name: "Thai Shrimp Coconut Curry with Cauliflower Rice",
    category: "Dinner",
    tags: ["shrimp", "thai", "curry", "low-carb"],
    vegetarian: false,
    time: { prep: 10, cook: 14 },
    macros: { protein: 70, netCarbs: 13, fat: 24, fiber: 4, calories: 548 },
    ingredients: [
      { item: "Raw shrimp (peeled)", qty: 300, unit: "g", aisle: "Seafood" },
      { item: "Light coconut milk", qty: 120, unit: "ml", aisle: "Pantry" },
      { item: "Red curry paste", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Pepper, mangetout & spinach", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Cauliflower rice", qty: 150, unit: "g", aisle: "Frozen" },
      { item: "Lime & coriander", qty: null, unit: "to taste", aisle: "Produce" }
    ],
    steps: [
      "Fry the curry paste briefly, then add the coconut milk and bring to a simmer.",
      "Add the vegetables, then the shrimp, and cook until the shrimp are just pink.",
      "Finish with lime and coriander; serve over cauliflower rice."
    ],
    notes: "Use light coconut milk and lots of shrimp to keep it high-protein and lower-fat."
  },
  {
    id: "tofu-katsu-cabbage",
    name: "Crispy Tofu Katsu with Cabbage",
    category: "Dinner",
    tags: ["tofu", "japanese", "vegetarian", "edamame"],
    vegetarian: true,
    time: { prep: 12, cook: 18 },
    macros: { protein: 70, netCarbs: 14, fat: 26, fiber: 7, calories: 570 },
    ingredients: [
      { item: "Extra-firm tofu", qty: 350, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large egg", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Almond flour & nutritional yeast", qty: 30, unit: "g", aisle: "Pantry" },
      { item: "Shelled edamame", qty: 120, unit: "g", aisle: "Frozen" },
      { item: "Shredded cabbage", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Sugar-free katsu/tonkatsu sauce", qty: 2, unit: "tbsp", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Slice the pressed tofu into slabs; dip in beaten egg then the almond flour and nutritional yeast.",
      "Pan-fry or air-fry until deeply golden and crisp.",
      "Serve sliced over shredded cabbage and warm edamame, drizzled with katsu sauce."
    ],
    notes: "A vegetarian katsu that genuinely hits 70 g — tofu, egg, nutritional yeast and edamame stack up."
  },

  /* ===================== EXPANSION BATCH 4 ===================== */

  /* ---- Dinner ---- */
  {
    id: "chicken-piccata-zoodles",
    name: "Chicken Piccata with Zoodles",
    category: "Dinner",
    tags: ["chicken", "italian", "low-carb", "quick"],
    vegetarian: false,
    time: { prep: 10, cook: 16 },
    macros: { protein: 70, netCarbs: 7, fat: 22, fiber: 3, calories: 506 },
    ingredients: [
      { item: "Chicken breast", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Zucchini (spiralized)", qty: 200, unit: "g", aisle: "Produce" },
      { item: "Capers, lemon & garlic", qty: 1, unit: "tbsp", aisle: "Condiments & Spices" },
      { item: "Butter", qty: 1, unit: "tbsp", aisle: "Eggs & Dairy" },
      { item: "Parmesan & parsley", qty: 15, unit: "g", aisle: "Eggs & Dairy" }
    ],
    steps: [
      "Pound the chicken thin, season and sear until golden; set aside.",
      "Deglaze with lemon, capers, garlic and a splash of water; swirl in the butter.",
      "Warm the zoodles, top with the chicken and lemon-caper sauce, and finish with parmesan."
    ],
    notes: "Bright, lemony and quick. Pounding the chicken thin helps it cook fast and stay juicy."
  },
  {
    id: "baked-trout-lemon-asparagus",
    name: "Baked Trout with Lemon & Asparagus",
    category: "Dinner",
    tags: ["trout", "high-omega3", "low-carb", "sheet-pan"],
    vegetarian: false,
    time: { prep: 6, cook: 16 },
    macros: { protein: 70, netCarbs: 6, fat: 30, fiber: 3, calories: 574 },
    ingredients: [
      { item: "Trout fillets", qty: 290, unit: "g", aisle: "Seafood" },
      { item: "Asparagus", qty: 150, unit: "g", aisle: "Produce" },
      { item: "Parmesan cheese", qty: 15, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Olive oil, lemon & dill", qty: 2, unit: "tsp", aisle: "Pantry" },
      { item: "Garlic, salt & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Heat oven to 200°C (400°F). Lay the trout and asparagus on a lined tray.",
      "Drizzle with oil, lemon, garlic and dill; scatter the parmesan over the asparagus.",
      "Bake 12-15 min until the trout flakes and the asparagus is tender."
    ],
    notes: "A one-tray dinner rich in omega-3s. Sea bass or salmon work just as well."
  },
  {
    id: "swedish-style-beef-meatballs",
    name: "Swedish-Style Beef Meatballs in Cream Sauce",
    category: "Dinner",
    tags: ["beef", "comfort", "low-carb", "meal-prep"],
    vegetarian: false,
    time: { prep: 15, cook: 18 },
    macros: { protein: 70, netCarbs: 9, fat: 32, fiber: 3, calories: 604 },
    ingredients: [
      { item: "Lean ground beef (90%)", qty: 230, unit: "g", aisle: "Meat & Poultry" },
      { item: "Large egg", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Parmesan cheese", qty: 15, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Double cream", qty: 30, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Almond flour & beef stock", qty: 15, unit: "g", aisle: "Pantry" },
      { item: "Green beans", qty: 120, unit: "g", aisle: "Produce" }
    ],
    steps: [
      "Mix the beef with the egg, parmesan, almond flour and seasoning; roll into small meatballs.",
      "Brown the meatballs, then make a quick gravy with stock and cream; simmer until cooked.",
      "Serve with steamed green beans."
    ],
    notes: "Comfort-food meatballs with a light cream gravy, kept low-carb with almond flour instead of breadcrumbs."
  },

  /* ---- Snack ---- */
  {
    id: "beef-jerky-cheese-plate",
    name: "Beef Jerky & Cheese Plate",
    category: "Snack",
    tags: ["beef", "jerky", "no-cook", "5-min"],
    vegetarian: false,
    time: { prep: 3, cook: 0 },
    macros: { protein: 70, netCarbs: 8, fat: 30, fiber: 2, calories: 582 },
    ingredients: [
      { item: "Beef jerky (low-sugar)", qty: 80, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cheese (cheddar/gouda)", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Almonds", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Cucumber & cherry tomatoes", qty: 80, unit: "g", aisle: "Produce" }
    ],
    steps: [
      "Arrange the jerky, cheese, almonds and crunchy veg on a plate or in a box.",
      "That's it — a savory, shelf-stable, high-protein snack."
    ],
    notes: "Choose a jerky with little or no added sugar. Great for travel and desk drawers."
  },
  {
    id: "smoked-salmon-cucumber-rolls",
    name: "Smoked Salmon & Cottage Cheese Cucumber Rolls",
    category: "Snack",
    tags: ["salmon", "cottage", "no-cook", "low-carb"],
    vegetarian: false,
    time: { prep: 8, cook: 0 },
    macros: { protein: 70, netCarbs: 6, fat: 22, fiber: 2, calories: 502 },
    ingredients: [
      { item: "Smoked salmon", qty: 180, unit: "g", aisle: "Seafood" },
      { item: "Low-fat cottage cheese", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Light cream cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Lemon, dill & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Mix the cottage cheese with the cream cheese, lemon and dill.",
      "Lay out the smoked salmon, spread with the cheese mix and roll up; or spoon onto cucumber ribbons.",
      "Season with pepper and serve cold."
    ],
    notes: "Elegant enough for guests, easy enough for a desk snack."
  },
  {
    id: "tuna-egg-protein-box",
    name: "Tuna & Egg Protein Box",
    category: "Snack",
    tags: ["tuna", "eggs", "no-cook", "meal-prep"],
    vegetarian: false,
    time: { prep: 6, cook: 0 },
    macros: { protein: 70, netCarbs: 5, fat: 18, fiber: 2, calories: 462 },
    ingredients: [
      { item: "Canned tuna in water (drained)", qty: 150, unit: "g", aisle: "Pantry" },
      { item: "Large eggs (hard-boiled)", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber & cherry tomatoes", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Lemon, salt & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Pack the tuna, halved eggs and cottage cheese into a lunchbox.",
      "Add the cucumber and tomatoes; season and squeeze over a little lemon."
    ],
    notes: "A no-cook, ultra-lean protein box you can assemble in minutes. Meal-prep friendly."
  },
  {
    id: "protein-hot-chocolate",
    name: "Protein Hot Chocolate",
    category: "Snack",
    tags: ["whey", "blender", "dessert", "warm"],
    vegetarian: true,
    time: { prep: 5, cook: 3 },
    macros: { protein: 70, netCarbs: 12, fat: 8, fiber: 3, calories: 400 },
    ingredients: [
      { item: "Whey or casein protein powder (chocolate)", qty: 60, unit: "g", aisle: "Supplements" },
      { item: "Skim milk", qty: 400, unit: "ml", aisle: "Eggs & Dairy" },
      { item: "Powdered peanut butter (PB2)", qty: 16, unit: "g", aisle: "Pantry" },
      { item: "Cocoa powder & sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Warm the milk gently (don't boil).",
      "Whisk in the protein, PB powder, cocoa and sweetener until smooth and frothy.",
      "Pour into a mug and enjoy warm."
    ],
    notes: "Casein protein makes an especially creamy, slow-digesting bedtime hot chocolate. 70 g protein in a mug."
  },
  {
    id: "peanut-butter-protein-mousse",
    name: "Peanut Butter Protein Mousse",
    category: "Snack",
    tags: ["whey", "yogurt", "dessert", "no-cook"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 9, fat: 10, fiber: 2, calories: 406 },
    ingredients: [
      { item: "0% Greek yogurt", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "Quark or fat-free fromage frais", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Powdered peanut butter (PB2)", qty: 16, unit: "g", aisle: "Pantry" },
      { item: "Sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Whip the yogurt, quark, whey and PB powder until thick and airy.",
      "Spoon into a glass and chill briefly for a firmer mousse."
    ],
    notes: "Peanut-butter dessert vibes for 70 g protein and around 400 kcal. Powdered PB keeps the fat low."
  },
  {
    id: "frozen-greek-yogurt-protein-bark",
    name: "Frozen Greek Yogurt Protein Bark",
    category: "Snack",
    tags: ["yogurt", "whey", "frozen", "make-ahead"],
    vegetarian: true,
    time: { prep: 8, cook: 0 },
    macros: { protein: 70, netCarbs: 13, fat: 12, fiber: 3, calories: 440 },
    ingredients: [
      { item: "0% Greek yogurt", qty: 300, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "Mixed berries", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Chopped nuts or seeds", qty: 15, unit: "g", aisle: "Pantry" }
    ],
    steps: [
      "Stir the whey through the yogurt until smooth and spread onto a lined tray.",
      "Scatter with berries and nuts and freeze until solid, ~3 hours.",
      "Break into shards and keep frozen; eat straight from the freezer."
    ],
    notes: "A frozen treat you can make in batches. Let it sit a minute before biting."
  },
  {
    id: "protein-mug-cake",
    name: "1-Minute Protein Mug Cake",
    category: "Snack",
    tags: ["whey", "eggs", "dessert", "quick"],
    vegetarian: true,
    time: { prep: 3, cook: 2 },
    macros: { protein: 70, netCarbs: 12, fat: 14, fiber: 3, calories: 454 },
    ingredients: [
      { item: "Vanilla or chocolate whey protein powder", qty: 40, unit: "g", aisle: "Supplements" },
      { item: "Large egg", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Almond flour", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Baking powder, cocoa & sweetener", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Blend all ingredients into a smooth batter and pour into a greased mug.",
      "Microwave 60-90 seconds until risen and just set.",
      "Cool a moment and eat from the mug."
    ],
    notes: "Blending in cottage cheese keeps the mug cake moist instead of rubbery. Dessert in under five minutes."
  },
  {
    id: "ricotta-berry-protein-bowl",
    name: "Whipped Ricotta & Berry Protein Bowl",
    category: "Snack",
    tags: ["ricotta", "whey", "dessert", "no-cook"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 12, fat: 14, fiber: 3, calories: 454 },
    ingredients: [
      { item: "Ricotta", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Vanilla whey protein powder", qty: 45, unit: "g", aisle: "Supplements" },
      { item: "0% Greek yogurt", qty: 150, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Mixed berries", qty: 60, unit: "g", aisle: "Produce" },
      { item: "Pumpkin seeds", qty: 10, unit: "g", aisle: "Pantry" }
    ],
    steps: [
      "Whip the ricotta with the whey and yogurt until light and smooth.",
      "Spoon into a bowl and top with berries and seeds."
    ],
    notes: "Whipped ricotta is luxuriously creamy; the whey lifts it to 70 g protein."
  },
  {
    id: "ham-cheese-protein-pinwheels",
    name: "Ham & Cheese Protein Pinwheels",
    category: "Snack",
    tags: ["ham", "pork", "no-cook", "5-min"],
    vegetarian: false,
    time: { prep: 6, cook: 0 },
    macros: { protein: 70, netCarbs: 4, fat: 30, fiber: 1, calories: 566 },
    ingredients: [
      { item: "Lean cooked ham (slices)", qty: 250, unit: "g", aisle: "Meat & Poultry" },
      { item: "Light cream cheese", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cheddar or Swiss cheese", qty: 80, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber or pickle spears", qty: 80, unit: "g", aisle: "Produce" },
      { item: "Mustard & black pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Spread the ham slices with cream cheese and a little mustard.",
      "Add a strip of cheese and a cucumber/pickle spear and roll up.",
      "Slice into pinwheels and serve."
    ],
    notes: "A near-zero-carb savory snack. Look for lower-sodium ham if you watch salt."
  },
  {
    id: "chicken-cheese-protein-box",
    name: "Chicken & Cheese Protein Box",
    category: "Snack",
    tags: ["chicken", "no-cook", "meal-prep", "low-carb"],
    vegetarian: false,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 4, fat: 22, fiber: 2, calories: 494 },
    ingredients: [
      { item: "Cooked chicken breast (sliced)", qty: 180, unit: "g", aisle: "Meat & Poultry" },
      { item: "Cheese (cheddar/edam)", qty: 40, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Large egg (hard-boiled)", qty: 1, unit: "", aisle: "Eggs & Dairy" },
      { item: "Cucumber, pepper & olives", qty: 100, unit: "g", aisle: "Produce" }
    ],
    steps: [
      "Pack the sliced chicken, cheese and egg into a snack box.",
      "Add the crunchy veg and olives. Grab and go."
    ],
    notes: "Use leftover roast or poached chicken. A clean, portable 70 g protein hit."
  },
  {
    id: "salmon-egg-protein-pot",
    name: "Salmon & Egg Protein Pot",
    category: "Snack",
    tags: ["salmon", "eggs", "cottage", "no-cook"],
    vegetarian: false,
    time: { prep: 6, cook: 0 },
    macros: { protein: 70, netCarbs: 4, fat: 24, fiber: 1, calories: 512 },
    ingredients: [
      { item: "Cooked or smoked salmon", qty: 150, unit: "g", aisle: "Seafood" },
      { item: "Large eggs (hard-boiled)", qty: 3, unit: "", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Chives, lemon & pepper", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Layer the cottage cheese, flaked salmon and halved eggs in a pot or jar.",
      "Finish with chives, lemon and pepper. Keeps for a day in the fridge."
    ],
    notes: "Three lean protein sources in one pot. A satisfying afternoon snack."
  },
  {
    id: "savory-whipped-cottage-everything",
    name: "Savory Whipped Cottage Cheese Bowl",
    category: "Snack",
    tags: ["cottage", "yogurt", "no-cook", "vegetarian"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 10, fat: 12, fiber: 4, calories: 428 },
    ingredients: [
      { item: "Low-fat cottage cheese", qty: 350, unit: "g", aisle: "Eggs & Dairy" },
      { item: "0% Greek yogurt", qty: 250, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Hemp seeds", qty: 20, unit: "g", aisle: "Pantry" },
      { item: "Cucumber & cherry tomatoes", qty: 100, unit: "g", aisle: "Produce" },
      { item: "Everything bagel seasoning", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Blend the cottage cheese and yogurt until smooth and whipped.",
      "Spoon into a bowl and top with chopped cucumber, tomatoes and hemp seeds.",
      "Finish with a generous sprinkle of everything bagel seasoning."
    ],
    notes: "The viral whipped-cottage-cheese trick, made savory. High protein, very low effort."
  },
  {
    id: "boiled-egg-cheese-snack-plate",
    name: "Egg & Cheese Snack Plate",
    category: "Snack",
    tags: ["eggs", "no-cook", "vegetarian", "5-min"],
    vegetarian: true,
    time: { prep: 5, cook: 0 },
    macros: { protein: 70, netCarbs: 5, fat: 32, fiber: 2, calories: 588 },
    ingredients: [
      { item: "Large eggs (hard-boiled)", qty: 4, unit: "", aisle: "Eggs & Dairy" },
      { item: "Cheese (cheddar/gouda)", qty: 100, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Low-fat cottage cheese", qty: 200, unit: "g", aisle: "Eggs & Dairy" },
      { item: "Cucumber, celery & cherry tomatoes", qty: 120, unit: "g", aisle: "Produce" },
      { item: "Salt, pepper & paprika", qty: null, unit: "to taste", aisle: "Condiments & Spices" }
    ],
    steps: [
      "Arrange the halved eggs, cheese and cottage cheese on a plate.",
      "Add the crunchy veg and season. A vegetarian, no-cook protein plate."
    ],
    notes: "Simple, filling and entirely no-cook. A reliable fallback when the fridge is bare."
  }
];
