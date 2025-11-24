export default defineNuxtRouteMiddleware((to) => {
  const route = to.path.replace(/\/+$/, ''); // Remove trailing slashes

  if (route === '/notes') {
    return navigateTo('/');
  }
});
