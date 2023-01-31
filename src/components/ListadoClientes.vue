<template>
    <v-simple-table class="full-width">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">
                        Nombre
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Tipo
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in $store.getters.getUserList" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <v-chip v-if="user.isAdmin" color="green" text-color="white">
                            Admin
                        </v-chip>
                        <v-chip v-else color="cyan" text-color="white">
                            Cliente
                        </v-chip>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>

export default {
    name: 'ListadoClientes',
};
</script>