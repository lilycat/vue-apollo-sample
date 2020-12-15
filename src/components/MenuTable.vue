<template>
  <v-container>
    <!--ツールバー-->
    <v-toolbar flat color="grey lighten-2">
      <v-toolbar-title>menu list</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="showDialogNew"
        >add new</v-btn
      >
    </v-toolbar>

    <!-- データテーブル -->
    <v-data-table
      :headers="headers"
      :items="menus"
      :options.sync="pagination"
      no-data-text="menus not found"
      class="elevation-1"
    >
      <v-progress-linear
        slot="progress"
        color="blue"
        indeterminate
      ></v-progress-linear>

      <!-- <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td><v-img :src="props.item.imageUrl"/></td>
        <td>{{ props.item.shop.name }}</td>
      </template> -->

      <template v-slot:[`item.imageUrl`]="{ item }">
        <v-img :src="item.imageUrl" max-width="100" max-height="100" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-container>
          <h2>new menu</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!--名前-->
            <v-text-field
              v-model="menu.name"
              :rules="nameRules"
              :counter="20"
              label="name"
              required
            ></v-text-field>
            <v-text-field
              v-model="menu.imageUrl"
              :counter="255"
              label="image url"
            ></v-text-field>
            <!--追加ボタン-->
            <v-btn :disabled="!valid" @click="createMenu"> add </v-btn>
            <!-- <v-btn @click="clear">clear</v-btn> -->
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ALL_MENUS } from "../constants/menu-query";
import { CREATE_MENU } from "../constants/menu-mutation";

export default {
  name: "MenuTable",
  data: () => ({
    // menus
    menus: [],
    // table headers
    headers: [
      { text: "menu name", value: "name" },
      { text: "description", value: "description" },
      { text: "image", value: "imageUrl" },
      { text: "shop name", value: "shop.name" },
    ],
    // データテーブルの初期ソート、表示件数の設定
    pagination: {
      descending: true,
      rowsPerPage: 10,
    },
    // フォーム入力値
    menu: {
      name: "",
      imageUrl: ""
    },
    // バリデーション
    valid: true,
    nameRules: [
      (v) => !!v || "名前は必須項目です",
      (v) => (v && v.length <= 20) || "名前は20文字以内で入力してください",
    ],
    // ローディングの表示フラグ
    progress: false,
    // ダイアログの表示フラグ
    dialog: false,
  }),
  apollo: {
    // get all menus
    menus: ALL_MENUS,
  },
  methods: {
    // --------------------------------
    // 新規作成
    // --------------------------------
    createMenu: function () {
      if (this.$refs.form.validate()) {
        this.progress = true;
        this.$apollo
          .mutate({
            mutation: CREATE_MENU,
            variables: {
              name: this.menu.name,
              imageUrl: this.menu.imageUrl
              // gender: this.menu.gender,
            },
          })
          .then(() => {
            this.$apollo.queries.menus.fetchMore({
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  menus: fetchMoreResult.menus,
                };
              },
            });
            this.dialog = false;
            this.progress = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    // --------------------------------
    // フォームのクリア
    // --------------------------------
    clear: function () {
      // this.$refs.form.reset();
    },
    // --------------------------------
    // 新規追加ダイアログの表示
    // --------------------------------
    showDialogNew: function () {
      this.clear();
      this.dialog = true;
    },
  },
};
</script>