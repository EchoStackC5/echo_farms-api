export const roles = [
  {
    role: "vendor",
    permissions: ["create_advert", "update_advert", "delete_advert"]
  },
  {
    role: "user",
    permissions: ["view_advert"]
  },
  {
    role: "admin",
    permissions: ["create_advert", "update_advert", "delete_advert", "view_advert", "manage_users"]
  }
];

export function checkPermission (role, action){
    if (role === 'vendor') {
        return permission.admin.includes(action);
    } else if (role === 'user') {
        return permission.tenant.includes(action);
    }
    return false;
}