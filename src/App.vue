<template>
	<div id="app">
		<loading-config v-if="loading"></loading-config>
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { GlobalService } from "./service";
import { setRoutes } from "./router";
import LoadingConfig from "./components/LoadingConfig.vue";

export default Vue.extend({
	components: {
		LoadingConfig
	},
	data() {
		return {
			loading: 0,
			layout: "div"
		};
	},
	async created() {
		this.loading++;
		const config = await GlobalService.getConfig();
		setRoutes(config.routeItems);
		const layoutComponent = await GlobalService.getComponent(
			config.layoutComponent
		);
		this.setLayout(layoutComponent);
		this.loading--;
	},
	methods: {
		setLayout(component: any) {
			Vue.component("micro-layout", component);
			this.layout = "micro-layout";
		}
	}
});
</script>

