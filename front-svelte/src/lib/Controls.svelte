<script lang="ts">
    import { ETestType, MAX_ITEMS_COUNT, MAX_TREE_DEEP } from "../main";

    let { forceRerender, itemsCountChange, switchTest, toggleShow } = $$props;

    export let testType: ETestType;

    export let itemsCount: number;

    const validate = (rawItemsCount: string) => {
        if (/^\d+$/.test(rawItemsCount)) {
            const count = Number.parseInt(rawItemsCount);

            if (testType === ETestType.TREE && count > MAX_ITEMS_COUNT) {
                return MAX_ITEMS_COUNT;
            }

            if (count > MAX_ITEMS_COUNT) {
                return 5000;
            }

            return count;
        } else {
            return 1;
        }
    }
</script>

<div class="controls">
    <div class="controls__header">
        <button id="render-btn" on:click={ forceRerender }>Rerender</button>
        <button id="show-btn" on:click={ toggleShow }>Toggle component show</button>
        <input  class="controls__inp"
                type='number'
                value={ itemsCount } on:change={(e) => itemsCountChange(validate(e.target.value))}
                min={1}
                max={testType === ETestType.TREE ? MAX_TREE_DEEP : MAX_ITEMS_COUNT}
        />
    </div>
    <div class="controls__btn-group">
        <button class='btn {testType === ETestType.STATIC ? "btn--active" : ""}'
                id="show-btn" on:click={ () => switchTest(ETestType.STATIC) }>Static elements</button>
        <button class='btn {testType === ETestType.LIST ? "btn--active" : ""}' id="show-btn" on:click={ () => switchTest(ETestType.LIST) }>Components list</button>
        <button class='btn {testType === ETestType.TREE ? "btn--active" : ""}' id="show-btn" on:click={ () => switchTest(ETestType.TREE) }>Components tree</button>
    </div>
</div>

<style lang="scss">
    .controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;

      &__header {
        display: flex;
        gap: 8px;
        justify-content: center;
      }

      &__inp {
        max-width: 140px;
      }

      &__btn-group {
        display: flex;
        gap: 8px;
        justify-content: center;
      }

      .btn--active {
        border-color: #646cff;
      }
    }
</style>
