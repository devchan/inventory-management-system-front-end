<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.manageProducts") }}</h1>
      <v-btn
        color="secondary"
        dark
        class="text-capitalize mt-2"
        elevation="0"
        :to="{ name: 'createProduct' }"
        v-permissions="'store_product'"
      >
        <v-icon small class="mr-1">mdi-plus</v-icon>
        {{ $t("buttons.createNew") }}
      </v-btn>
    </div>
    <DataTable
      :headers="headers"
      :serviceFunction="productsService.getProducts"
      ref="productsTable"
    >
      <template v-slot:actions="{ item }">
        <ActionsMenu
          :item="item"
          :handleEdit="{ name: 'editProduct', params: { id: item.id } }"
          :handleDelete="handleDelete"
          editPermission="update_product"
          deletePermission="destroy_product"
          :permissions="['update_product', 'destroy_product']"
        />
      </template>
      <template v-slot:category="{ item }">
        {{ item.category.name }}
      </template>
      <template v-slot:avatar="{ item }">
        <v-avatar size="30">
          <img :src="item.image" :alt="item.name" />
        </v-avatar>
      </template>
    </DataTable>
    <ConfirmationAlert ref="deleteConfirmation" />
  </v-container>
</template>

<script>
import productsService from "@/services/products.service";
import DataTable from "@/components/layouts/DataTable.component.vue";
import ConfirmationAlert from "@/components/layouts/ConfirmationAlert.component.vue";
import ActionsMenu from "@/components/layouts/ActionsMenu.component.vue";
import functionsUtility from "@/utilities/functions.utility";

export default {
  components: { DataTable, ConfirmationAlert, ActionsMenu },
  data() {
    return {
      headers: [
        { value: "avatar" },
        { text: this.$t("inputs.name"), value: "name" },
        { text: this.$t("inputs.description"), value: "description" },
        { text: this.$t("inputs.quantity"), value: "quantity" },
        { text: this.$t("inputs.price"), value: "price" },
        { text: this.$t("inputs.category"), value: "category" },

        { value: "actions" },
      ],
      productsService,
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
            productsService.deleteProduct(item.id).then(() => {
              this.$refs.productsTable.getItems();
            });
          }
        });
    },
  },
};
</script>
