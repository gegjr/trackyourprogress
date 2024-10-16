import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppSettings = defineStore('appSettings', () => {
    const settings = ref({
        isEditState: false,
        sidebarState: 'normal'
    })

    function toggleEdit(){
        settings.value.isEditState = !settings.value.isEditState
        settings.value.isEditState ? settings.value.sidebarState = 'big' : settings.value.sidebarState = 'normal'
    }
    return {
        settings,
        toggleEdit
    }
})
