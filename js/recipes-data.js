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
  }
];
