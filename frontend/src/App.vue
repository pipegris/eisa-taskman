<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <RouterLink to="/" class="navbar-brand">
        <img
          alt="Task logo"
          class="logo"
          src="@/assets/task-done-flat.png"
          width="48"
          height="48"
        />
        TaskMan</RouterLink
      >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/task" class="nav-link">List</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/task/add" class="nav-link">New</RouterLink>
        </li>
      </ul>
    </nav>
    <notifications position="bottom right" />

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
};
</script>
