import React from 'react';
import { ETestType } from "./types.ts";
import classNames from 'classnames';
import { MAX_ITEMS_COUNT, MAX_TREE_DEEP } from "./constants.ts";

interface IControlProps {
    testType: ETestType;
    itemsCount: number;
    onForceUpdate: () => void;
    onToggleShow: () => void;
    onSwitchTest: (testType: ETestType) => void;
    onItemsCountChange: (itemCount: number) => void;
}

const Controls: React.FC<IControlProps> = ({ testType, itemsCount, onForceUpdate, onToggleShow, onSwitchTest, onItemsCountChange }) => {
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


    return (
        <div style={ { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' } }>
            <div style={ {display: 'flex', gap: '8px', justifyContent: 'center'} }>
                <button id="render-btn" onClick={ onForceUpdate }>Rerender</button>
                <button id="show-btn" onClick={ onToggleShow }>Toggle component show</button>
                <input
                    style={{ maxWidth: '140px' }}
                    type='number'
                    value={ itemsCount } onChange={(e) => onItemsCountChange(validate(e.target.value))}
                    min={1}
                    max={testType === ETestType.TREE ? MAX_TREE_DEEP : MAX_ITEMS_COUNT}
                ></input>
            </div>
            <div style={ {display: 'flex', gap: '8px', justifyContent: 'center'} }>
                <button className={classNames('btn', {
                    'btn--active': testType === ETestType.STATIC
                })} id="show-btn" onClick={ () => onSwitchTest(ETestType.STATIC) }>Static elements</button>
                <button className={classNames('btn', {
                    'btn--active': testType === ETestType.LIST
                })} id="show-btn" onClick={ () => onSwitchTest(ETestType.LIST) }>Components list</button>
                <button className={classNames('btn', {
                    'btn--active': testType === ETestType.TREE
                })} id="show-btn" onClick={ () => onSwitchTest(ETestType.TREE) }>Components tree</button>
            </div>
        </div>
    );
};

export default Controls;
