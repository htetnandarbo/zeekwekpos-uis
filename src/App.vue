<template>
  <div>
    <div class="p-10">
      <button
        class="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
        @click="open = true"
      >
        Open Modal
      </button>
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center md:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-2xl bg-white px-6 pb-6 pt-6 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl"
              >
                <div
                  class="absolute right-0 top-0 pr-4 pt-4 sm:block z-20 bg-white"
                >
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                    @click="open = false"
                  >
                    <XMarkIcon class="size-6" />
                  </button>
                </div>

                <div class="max-h-[85vh] overflow-y-auto scroll-hide">
                  <!-- Header -->
                  <div class="sticky top-0 z-10 bg-white border-b mb-3">
                    <h3
                      class="text-base md:text-lg font-semibold text-gray-900 mb-2"
                    >
                      {{ item.name }} -
                      <span class="text-red-500">{{ item.price }}KS</span>
                    </h3>
                  </div>

                  <!-- Quantity -->
                  <div class="mb-6">
                    <label
                      class="block text-sm font-semibold text-gray-900 mb-3"
                      >Quantity</label
                    >
                    <div
                      class="flex items-center w-full border border-gray-300 p-1 rounded-lg"
                    >
                      <button
                        type="button"
                        class="rounded-md bg-gray-100 px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                        @click="decreaseQty"
                      >
                        <MinusIcon class="size-5" />
                      </button>
                      <input
                        type="text"
                        v-model="item.quantity"
                        class="w-full bg-transparent text-center text-base text-gray-900 focus:outline-none focus:ring-0"
                        inputmode="numeric"
                        pattern="[0-9]*"
                      />
                      <button
                        type="button"
                        class="rounded-md bg-gray-100 px-3 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                        @click="increaseQty"
                      >
                        <PlusIcon class="size-5" />
                      </button>
                    </div>
                  </div>

                  <!-- Variants -->
                  <div v-if="item.variants?.length" class="mb-6">
                    <fieldset>
                      <legend
                        class="text-sm/6 font-semibold text-gray-900 mb-3"
                      >
                        Choose Variant
                      </legend>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label
                          v-for="variant in item.variants"
                          :key="variant.id"
                          :aria-label="variant.title"
                          class="group relative flex rounded-lg border border-gray-300 bg-white p-4 has-[:disabled]:border-gray-400 has-[:disabled]:bg-gray-200 has-[:disabled]:opacity-25 has-[:checked]:outline has-[:focus-visible]:outline has-[:checked]:outline-2 has-[:focus-visible]:outline-[3px] has-[:checked]:-outline-offset-2 has-[:focus-visible]:-outline-offset-1 has-[:checked]:outline-emerald-500"
                        >
                          <input
                            type="radio"
                            name="mailing-list"
                            :value="variant.id"
                            :checked="variant === item.variants[0]"
                            class="absolute inset-0 appearance-none focus:outline focus:outline-0"
                          />
                          <div class="flex justify-between w-full">
                            <span class="text-sm font-medium text-gray-900">{{
                              variant.title
                            }}</span>
                            <span class="text-sm font-medium text-gray-900"
                              >{{ variant.price }}ks</span
                            >
                          </div>
                          <CheckCircleIcon
                            class="absolute top-1 right-1 invisible size-4 text-emerald-500 group-has-[:checked]:visible"
                            aria-hidden="true"
                          />
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <!-- Subitems -->
                  <div v-if="item.subitems?.length" class="mb-6">
                    <fieldset>
                      <legend
                        class="text-sm/6 font-semibold text-gray-900 mb-3"
                      >
                        Choose Subitems
                      </legend>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label
                          v-for="sub in item.subitems"
                          :key="sub.name"
                          class="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 transition hover:border-emerald-300 has-[:checked]:border-emerald-500 has-[:checked]:ring-1 has-[:checked]:ring-emerald-400"
                        >
                          <input
                            type="checkbox"
                            :value="sub.name"
                            v-model="item.selectedSubitems"
                            class="absolute inset-0 appearance-none focus:outline-none"
                          />
                          <div class="flex justify-between w-full">
                            <span class="text-sm font-medium text-gray-900">{{
                              sub.name
                            }}</span>
                            <span class="text-sm font-medium text-gray-700"
                              >+{{ sub.price }}ks</span
                            >
                          </div>
                          <CheckCircleIcon
                            class="absolute top-1 right-1 invisible size-4 text-emerald-500 group-has-[:checked]:visible"
                            aria-hidden="true"
                          />
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <!-- Tiered Pricing -->
                  <div v-if="item.tiers?.length" class="mb-6">
                    <fieldset>
                      <legend
                        class="text-sm/6 font-semibold text-gray-900 mb-3"
                      >
                        Choose Tier
                      </legend>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label
                          v-for="tier in item.tiers"
                          :key="tier.name"
                          class="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 transition hover:border-emerald-300 has-[:checked]:border-emerald-500 has-[:checked]:ring-1 has-[:checked]:ring-emerald-400"
                        >
                          <input
                            type="radio"
                            name="tier"
                            :value="tier"
                            v-model="item.selectedTier"
                            class="absolute inset-0 appearance-none focus:outline-none"
                          />
                          <div class="flex justify-between w-full">
                            <span class="text-sm font-medium text-gray-900">{{
                              tier.name
                            }}</span>
                            <span class="text-sm font-medium text-gray-700"
                              >{{ tier.price }}ks</span
                            >
                          </div>
                          <CheckCircleIcon
                            class="absolute top-1 right-1 invisible size-4 text-emerald-500 group-has-[:checked]:visible"
                            aria-hidden="true"
                          />
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  <!-- Discount -->
                  <div class="mb-6">
                    <label
                      class="block text-sm/6 font-semibold text-gray-900 mb-3"
                      id="availability-label"
                      >Discounts</label
                    >
                    <div class="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                      <div class="flex items-center justify-between">
                        <span class="flex grow flex-col">
                          <span
                            class="text-sm text-gray-500"
                            id="availability-description"
                            >Black Friday, 20%</span
                          >
                        </span>
                        <div
                          class="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 outline-offset-2 outline-emerald-500 ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out has-[:checked]:bg-emerald-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
                        >
                          <span
                            class="size-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-5"
                          />
                          <input
                            type="checkbox"
                            class="absolute inset-0 appearance-none focus:outline-none"
                            id="availability"
                            name="availability"
                            aria-labelledby="availability-label"
                            aria-describedby="availability-description"
                          />
                        </div>
                      </div>

                      <div class="flex items-center justify-between">
                        <span class="flex grow flex-col">
                          <span
                            class="text-sm text-gray-500"
                            id="availability-description"
                            >New Year, 5%</span
                          >
                        </span>
                        <div
                          class="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 outline-offset-2 outline-emerald-500 ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out has-[:checked]:bg-emerald-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
                        >
                          <span
                            class="size-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-5"
                          />
                          <input
                            type="checkbox"
                            class="absolute inset-0 appearance-none focus:outline-none"
                            id="availability"
                            name="availability"
                            aria-labelledby="availability-label"
                            aria-describedby="availability-description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tax -->
                  <div class="mb-6">
                    <label
                      class="block text-sm/6 font-semibold text-gray-900 mb-3"
                      id="availability-label"
                      >Taxes</label
                    >
                    <div class="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                      <div class="flex items-center justify-between">
                        <span class="flex grow flex-col">
                          <span
                            class="text-sm text-gray-500"
                            id="availability-description"
                            >Gov Tax, 2%</span
                          >
                        </span>
                        <div
                          class="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 outline-offset-2 outline-emerald-500 ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out has-[:checked]:bg-emerald-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
                        >
                          <span
                            class="size-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-5"
                          />
                          <input
                            type="checkbox"
                            class="absolute inset-0 appearance-none focus:outline-none"
                            id="availability"
                            name="availability"
                            aria-labelledby="availability-label"
                            aria-describedby="availability-description"
                          />
                        </div>
                      </div>

                      <div class="flex items-center justify-between">
                        <span class="flex grow flex-col">
                          <span
                            class="text-sm text-gray-500"
                            id="availability-description"
                            >Shop Tax, 1%</span
                          >
                        </span>
                        <div
                          class="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 outline-offset-2 outline-emerald-500 ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out has-[:checked]:bg-emerald-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-2"
                        >
                          <span
                            class="size-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-5"
                          />
                          <input
                            type="checkbox"
                            class="absolute inset-0 appearance-none focus:outline-none"
                            id="availability"
                            name="availability"
                            aria-labelledby="availability-label"
                            aria-describedby="availability-description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Note -->
                  <div class="mb-6">
                    <label
                      for="note"
                      class="block text-sm/6 font-semibold text-gray-900 mb-3"
                      >Add your note</label
                    >
                    <div class="mt-2">
                      <textarea
                        rows="3"
                        name="comment"
                        id="comment"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <!-- Actions -->
                  <div
                    class="flex flex-col md:flex-row md:justify-end md:space-x-3 gap-y-2"
                  >
                    <button
                      class="flex justify-center items-center order-2 sm:order-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                      @click="removeFromCart"
                    >
                      <XMarkIcon class="size-5" />
                      <span>Remove from Cart</span>
                    </button>
                    <button
                      class="flex justify-center items-center order-1 sm:order-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
                      @click="saveToCart"
                    >
                      <CheckIcon class="size-5" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";

const open = ref(false);

const item = ref({
  name: "Pizza Margherita",
  price: 8000,
  quantity: 1,
  variants: [
    {
      id: "small",
      title: "Small",
      price: "1000",
    },
    {
      id: "medium",
      title: "Medium",
      price: "2000",
    },
    {
      id: "large",
      title: "Large",
      price: "3000",
    },
  ],
  subitems: [
    { name: "Extra Cheese", price: 1000 },
    { name: "Olives", price: 1000 },
    { name: "Mushrooms", price: 1200 },
  ],
  selectedSubitems: [],
  tiers: [
    { name: "Regular", price: 6000 },
    { name: "Premium", price: 5000 },
  ],
});

function increaseQty() {
  item.value.quantity++;
}

function decreaseQty() {
  if (item.value.quantity > 1) {
    item.value.quantity--;
  }
}

function saveToCart() {
  console.log("Saving item:", item.value);
  open.value = false;
}

function removeFromCart() {
  console.log("Removing item from cart");
  open.value = false;
}
</script>
<style scoped>
.scroll-hide::-webkit-scrollbar {
  display: none;
}
.scroll-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
