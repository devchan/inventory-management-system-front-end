<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.manageCategories") }}</h1>
      <v-btn
        color="secondary"
        dark
        class="text-capitalize mt-2"
        elevation="0"
        :to="{ name: 'createCategory' }"
        v-permissions="'store_category'"
      >
        <v-icon small class="mr-1">mdi-plus</v-icon>
        {{ $t("buttons.createNew") }}
      </v-btn>
    </div>
    <DataTable
      :headers="headers"
      :serviceFunction="categoriesService.getCategories"
      ref="categoriesTable"
    >
      <template v-slot:actions="{ item }">
        <ActionsMenu
          :item="item"
          :handleEdit="{ name: 'editCategory', params: { id: item.id } }"
          :handleDelete="handleDelete"
          editPermission="update_category"
          deletePermission="destroy_category"
          :permissions="['update_category', 'destroy_category']"
        />
      </template>
    </DataTable>
    <ConfirmationAlert ref="deleteConfirmation" />
  </v-container>
</template>

<script>
import categoriesService from "@/services/categories.service";
import DataTable from "@/components/layouts/DataTable.component.vue";
import ConfirmationAlert from "@/components/layouts/ConfirmationAlert.component.vue";
import ActionsMenu from "@/components/layouts/ActionsMenu.component.vue";
import functionsUtility from "@/utilities/functions.utility";

export default {
  components: { DataTable, ConfirmationAlert, ActionsMenu },
  data() {
    return {
      headers: [
        { text: this.$t("inputs.name"), value: "name" },
        { value: "actions" },
      ],
      categoriesService,
      functionsUtility,
    };
  },
  methods: {
    handleDelete(item) {
      this.$refs.deleteConfirmation
        .open(
          this.$t("headings.areYouSure"),
          this.$t("texts.doYouWantToDeleteItem", { item: item.name }),
          {
            color: "error",
          }
        )
        .then((confirm) => {
          if (confirm) {
            categoriesService.deleteCategory(item.id).then(() => {
              this.$refs.categoriesTable.getItems();
            });
          }
        });
    },
  },
};
</script>
