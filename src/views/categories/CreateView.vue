<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.createCategory") }}</h1>
    </div>
    <CategoryForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import CategoryForm from "@/components/forms/CategoryForm.component.vue";
import categoriesService from "@/services/categories.service";
import { categoryModel } from "@/utilities/models.utility";

export default {
  name: "CreateCategoryView",
  components: { CategoryForm },
  data() {
    return {
      initialData: { ...categoryModel },
    };
  },
  methods: {
    handleSave(payload) {
      categoriesService.createCategory(payload).then(() => {
        this.$router.push({ name: "categories" });
      });
    },
  },
};
</script>
