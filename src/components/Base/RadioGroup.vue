<template>
    <div class="radio__wrapper">
        <label v-for="item of options" :key="item.value" class="radio text-gray-500" :class="{ disabled: item.disabled }">
            <input v-model="selected" :value="item.value" :disabled="item.disabled" class="radio__input" type="radio" @input="emit('input', item.value)">
            <div class="radio__check"></div>
            {{ item.label }}
        </label>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
        defaultValue: { type: String, default: '' },
        options: { type: Array, default: [] },
    }),
    emit = defineEmits(['input'])


let selected = ref(props.defaultValue)
let query = ref('')

</script>

.<style lang="scss" scoped>
.radio {
    display: flex;
    align-items: center;
    gap: 10px;
    &.disabled {
        opacity: 0.8;
        .radio__check {
            border-color: rgb(107 114 128);
        }
    }
    &__wrapper {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    &__input {
        display: none!important;
        &:checked + .radio__check::before {
            opacity: 1;        
        }
    }
    &__check {
        cursor: pointer;
        height: 18px;
        width: 18px;
        border: 2px solid #21a28e;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
            content: '';
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #21a28e;
            opacity: 0;
            transition: .3s;
        }
    }
}
</style>