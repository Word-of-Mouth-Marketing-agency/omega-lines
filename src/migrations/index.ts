import * as migration_20260722_123540_initial_foundation from './20260722_123540_initial_foundation';
import * as migration_20260726_074625_homepage_global from './20260726_074625_homepage_global';
import * as migration_20260726_092951 from './20260726_092951';
import * as migration_20260728_product_subcategories from './20260728_product_subcategories';
import * as migration_20260728_hero_video from './20260728_hero_video';
import * as migration_20260804_inquiry_form_fields from './20260804_inquiry_form_fields';
import * as migration_20260804_inquiry_legacy_compat from './20260804_inquiry_legacy_compat';
import * as migration_20260902_contact_information_arrays from './20260902_contact_information_arrays';
import * as migration_20260902_homepage_about_strengths from './20260902_homepage_about_strengths';
import * as migration_20260902_homepage_about_locale_fields from './20260902_homepage_about_locale_fields';
import * as migration_20260902_about_page_global from './20260902_about_page_global';

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
  {
    up: migration_20260804_inquiry_form_fields.up,
    down: migration_20260804_inquiry_form_fields.down,
    name: '20260804_inquiry_form_fields',
  },
  {
    up: migration_20260804_inquiry_legacy_compat.up,
    down: migration_20260804_inquiry_legacy_compat.down,
    name: '20260804_inquiry_legacy_compat',
  },
  {
    up: migration_20260902_contact_information_arrays.up,
    down: migration_20260902_contact_information_arrays.down,
    name: '20260902_contact_information_arrays',
  },
  {
    up: migration_20260902_homepage_about_strengths.up,
    down: migration_20260902_homepage_about_strengths.down,
    name: '20260902_homepage_about_strengths',
  },
  {
    up: migration_20260902_homepage_about_locale_fields.up,
    down: migration_20260902_homepage_about_locale_fields.down,
    name: '20260902_homepage_about_locale_fields',
  },
  {
    up: migration_20260902_about_page_global.up,
    down: migration_20260902_about_page_global.down,
    name: '20260902_about_page_global',
  },
];
