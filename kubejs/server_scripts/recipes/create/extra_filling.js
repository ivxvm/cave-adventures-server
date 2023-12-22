const BUCKET_DELTA = 100;

ServerEvents.recipes((event) => {
  if (global.isNormalMode == false) {
    return;
  }

  const bucketFilledRecipes = [
    // Water jetpacks
    {
      itemId: "create_sa:copper_jetpack_chestplate",
      bucketId: "minecraft:water_bucket",
      fluidTag: "tagWater",
      fluidCapacity: 1600,
    },
    {
      itemId: "create_sa:brass_jetpack_chestplate",
      bucketId: "minecraft:water_bucket",
      fluidTag: "tagWater",
      fluidCapacity: 1600,
    },
    // Water tanks
    {
      itemId: "create_sa:small_filling_tank",
      bucketId: "minecraft:water_bucket",
      fluidTag: "tagStock",
      fluidCapacity: 800,
    },
    {
      itemId: "create_sa:medium_filling_tank",
      bucketId: "minecraft:water_bucket",
      fluidTag: "tagStock",
      fluidCapacity: 1600,
    },
    {
      itemId: "create_sa:large_filling_tank",
      bucketId: "minecraft:water_bucket",
      fluidTag: "tagStock",
      fluidCapacity: 3200,
    },
    // Lava jetpacks
    {
      itemId: "create_sa:andesite_jetpack_chestplate",
      bucketId: "minecraft:lava_bucket",
      fluidTag: "tagFuel",
      fluidCapacity: 1600,
    },
    {
      itemId: "create_sa:brass_jetpack_chestplate",
      bucketId: "minecraft:lava_bucket",
      fluidTag: "tagFuel",
      fluidCapacity: 1600,
    },
    // Lava tanks
    {
      itemId: "create_sa:small_fueling_tank",
      bucketId: "minecraft:lava_bucket",
      fluidTag: "tagStock",
      fluidCapacity: 800,
    },
    {
      itemId: "create_sa:medium_fueling_tank",
      bucketId: "minecraft:lava_bucket",
      fluidTag: "tagStock",
      fluidCapacity: 1600,
    },
    {
      itemId: "create_sa:large_fueling_tank",
      bucketId: "minecraft:lava_bucket",
      fluidTag: "tagStock",
      fluidCapacity: 3200,
    },
  ];

  bucketFilledRecipes.forEach((recipe) => {
    const previewNbt = {};
    previewNbt[recipe.fluidTag] = BUCKET_DELTA;
    event
      .shaped(Item.of(recipe.itemId, previewNbt).weakNBT(), [" B ", " I "], {
        I: recipe.itemId,
        B: recipe.bucketId,
      })
      .modifyResult((grid, result) => {
        const vessel = grid.find(recipe.itemId);
        const newNbt = {};
        newNbt[recipe.fluidTag] = Math.min(
          recipe.fluidCapacity,
          BUCKET_DELTA + (vessel.nbt[recipe.fluidTag] || 0)
        );
        return result.withNBT(Object.assign({}, vessel.nbt, newNbt));
      })
      .id(
        [
          "hypercube:fill_",
          recipe.itemId.split(":")[1],
          "_with_",
          recipe.bucketId.split(":")[1],
        ].join("")
      );
  });
});
