<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.editCategory") }}</h1>
    </div>
    <CategoryForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import CategoryForm from "@/components/forms/CategoryForm.component.vue";
import categoriesService from "@/services/categories.service";
import functionsUtilities from "@/utilities/functions.utility";
import { categoryModel } from "@/utilities/models.utility";

export default {
  name: "EditCategoryView",
  components: { CategoryForm },
  data() {
    return {
      initialData: { ...categoryModel },
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      categoriesService.getCategory(this.$route.params.id).then((response) => {
        this.initialData = functionsUtilities.copyValues(
          response.data,
          this.initialData
        );
        this.initialData.category_model_id = response.data.model.id;
      });
    },
    handleSave(payload) {
      categoriesService
        .updateCategory(this.$route.params.id, payload)
        .then(() => {
          this.$router.push({ name: "categories" });
        });
    },
  },
};
</script>
