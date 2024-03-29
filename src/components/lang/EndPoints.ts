export const ENDPOINTS = {
  PROPERTY: {
    ADD: 'v1/property/add',
    GET: 'v1/property',
    ADD_IMAGES: 'v1/property/add-photos',
    ADD_AMENITIES: 'v1/property/add-amenities',
    DELETE: 'v1/property',
    UPDATE: 'v1/property/update',
  },
  CONTENT: {
    ADD: 'v1/content/add',
    UPDATE: 'v1/content',
    GET: 'v1/content',
    DELETE: 'v1/content',
  },
  BOOKING: {
    GET: 'v1/booking',
  },
  CONFIGURATION: {
    GET: 'v1/configuration',
  },
  ROOM: {
    GET: `v1/room`,
    ADD: `v1/room/add`,
    UPDATE_AMENITIES: `v1/room/update-amenities`,
  },
  USER: {
    GET_USER: 'v1/customer',
    SINGLE_CUSTOMER_BOOKING: 'v1/customer/booking',
  },
  LOGIN: {
    SIGNIN: 'auth/superadmin-signin',
    ADMIN:'auth/admin-signin',
    CHECK: 'v1/signin',
    NEW_TOKEN: 'auth/new_token',
  },
};
