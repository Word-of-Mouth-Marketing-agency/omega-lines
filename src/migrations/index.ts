import * as migration_20260722_123540_initial_foundation from './20260722_123540_initial_foundation';
import * as migration_20260726_074625_homepage_global from './20260726_074625_homepage_global';
import * as migration_20260726_092951 from './20260726_092951';
import * as migration_20260728_product_subcategories from './20260728_product_subcategories';
import * as migration_20260728_hero_video from './20260728_hero_video';

export const migrations = [
  {
    up: migration_20260722_123540_initial_foundation.up,
    down: migration_20260722_123540_initial_foundation.down,
    name: '20260722_123540_initial_foundation',
  },
  {
    up: migration_20260726_074625_homepage_global.up,
    down: migration_20260726_074625_homepage_global.down,
    name: '20260726_074625_homepage_global',
  },
  {
    up: migration_20260726_092951.up,
    down: migration_20260726_092951.down,
    name: '20260726_092951',
  },
  {
    up: migration_20260728_product_subcategories.up,
    down: migration_20260728_product_subcategories.down,
    name: '20260728_product_subcategories',
  },
  {
    up: migration_20260728_hero_video.up,
    down: migration_20260728_hero_video.down,
    name: '20260728_hero_video',
  },
];
