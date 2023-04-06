<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                transform
                rounded-2xl
                bg-white
                px-8
                pb-6
                text-left
                align-middle
                shadow-xl
                transition-all
                w-full
                max-w-xl
              "
            >
              <DialogTitle
                as="h3"
                class="
                  pt-6
                  pb-4
                  -mx-8
                  px-8
                  flex
                  items-center
                  justify-between
                  text-xl
                  leading-6
                  cameras__modal_title
                  border-b border-gray-200
                  cursor-move
                "
              >
                Subscription plan
                <XIcon
                  class="
                    w-4
                    h-4
                    text-gray-500
                    hover:text-teal-600
                    cursor-pointer
                  "
                  @click="closeModal"
                />
              </DialogTitle>

              <Form v-slot="{ handleSubmit }">
                <p class="my-4">Choose subscription plan</p>
                <form @submit.prevent="handleSubmit(saveChanges)">
                  <BaseListbox
                    v-model="selectedPlan"
                    :options="planList"
                    placeholder="Choose subscription plan"
                  />

                  <template v-if="selectedPlan">
                    <div class="text-center pt-5">
                      <h3 class="text-blue-600 text-2xl">
                        {{ selectedPlan.displayName }}
                      </h3>

                      <div class="my-6">
                        <span class="font-light text-sm">$</span>
                        <span class="text-3xl">{{
                          selectedPlan.basePriceUsd
                        }}</span>
                        <span class="font-light text-sm">/month</span>
                      </div>

                      <div class="font-light text-sm">
                        <span class="font-semibold">{{
                          selectedPlan.baseLimitHours
                        }}</span>
                        hours of monitoring
                      </div>

                      <div class="font-light text-sm">
                        <span class="font-semibold"
                          >${{ selectedPlan.ExtraUsagePriceUsdHour }}/h
                        </span>
                        per additional hour
                      </div>
                    </div>
                  </template>

                  <div class="border border-gray-300 p-3 mt-4">
                    <StripeElements
                      v-if="stripeLoaded"
                      v-slot="{ elements }"
                      ref="elms"
                      :stripe-key="publishableKey"
                      :instance-options="instanceOptions"
                      :elements-options="elementsOptions"
                    >
                      <StripeElement
                        ref="stripeCard"
                        :elements="elements"
                        :options="cardOptions"
                      />
                    </StripeElements>
                  </div>

                  <span class="text-xs font-light">Powered by 
                    <a href="https://stripe.com" target="_blank" class="text-primary">Stripe</a>
                  </span>
                  
                  <div class="text-center mt-4">
                    <BaseButton
                      title="Save changes"
                      rounded
                      outline
                      class="border-solid border-2 border-teal-400"
                    />
                  </div>
                </form>
              </Form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted, inject, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Switch,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/solid";
import { Form, Field } from "vee-validate";
import BaseButton from "@/components/Base/Button.vue";
import BaseListbox from "@/components/Base/Listbox.vue";

import { loadStripe } from '@stripe/stripe-js'
import { StripeElements, StripeElement } from 'vue-stripe-js'
const { $api, $snotify } = inject("$app");

const props = defineProps(["open", "billingData", "planList"]);
const emit = defineEmits(["close"]);

let isOpen = ref(props.open);
let selectedPlan = ref(null);
// let planList = ref([]);

function closeModal() {
  isOpen.value = false;
  emit("close", false);
}

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;

    if (props.planList.length) {
      const plan = props.planList.find(el => el.value.id === props.billingData.planId)
      selectedPlan.value = plan
    }
  }
);

let publishableKey = import.meta.env.VITE_VUE_STRIPE_PUBLISHABLE_KEY;
let stripeLoaded = ref(false)
const instanceOptions = ref({
  // https://stripe.com/docs/js/initializing#init_stripe_js-options
})
const elementsOptions = ref({
  // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
})
const cardOptions = ref({
  // https://stripe.com/docs/stripe.js#element-options
  value: {
    postalCode: '12345',
  },
})
let stripeCard = ref(null);
const elms = ref()

const saveChanges = async () => {
  try {
    const cardElement = stripeCard.value.stripeElement

    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

    elms.value.instance.createPaymentMethod({
			type: 'card',
			card: cardElement,
			billing_details: {
				email: email
			}
    }).then((result) => {
      console.log('result', result)
    })

    const data = {
      planId: selectedPlan.value.id,
      includeTrial: true,
      promoCode: ''
    }

    await $api.billing.subscribePlan(data)

    closeModal()
  } catch (error) {
    $snotify.error(error.messages || error.message);
  }
}

onMounted(() => {
  const stripePromise = loadStripe(publishableKey)
  stripePromise.then(() => {
    stripeLoaded.value = true
  })

});
</script>
<script>
import { StripeElementCard } from "@vue-stripe/vue-stripe";

export default {
  name: 'BillingPlan',

  components: {
    StripeElementCard,
  },
}
</script>
