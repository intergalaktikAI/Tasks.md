import { createMemo, For, Show } from "solid-js";
import { handleKeyDown } from "../utils";
import { getProgressFromContent } from "../card-content-utils";

/**
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {boolean} props.disableDrag
 * @param {Object[]} props.tags
 * @param {string} props.dueDate
 * @param {string} props.content
 * @param {Function} props.onClick
 * @param {JSX.Element} props.headerSlot
 * @param {boolean} props.selectionMode
 * @param {boolean} props.isSelected
 * @param {Function} props.onSelectionChange
 * @param {Function} props.onFocus
 * @param {string} props.owner
 * @param {Object} props.currentUser
 * @param {boolean} props.canEdit
 * @param {Function} props.onProgressIncrement - Called when progress is incremented
 */
export function Card(props) {
  const progress = createMemo(() => getProgressFromContent(props.content));
  const progressPercent = createMemo(() => {
    const p = progress();
    if (!p || p.total === 0) return 0;
    return Math.round((p.completed / p.total) * 100);
  });

  const dueDateStatusClass = createMemo(() => {
    if (!props.dueDate) {
      return '';
    }
    const [year, month, day] = props.dueDate.split('-')
    const dueDateLocalTime = new Date(year, month - 1, day);
    const dueDateLocalTimeISO = dueDateLocalTime.toISOString().split('T')[0];
    const todayISO = new Date().toISOString().split('T')[0];
    if (dueDateLocalTimeISO === todayISO) {
      return 'card__due-date--in-time';
    }
    if (dueDateLocalTimeISO < todayISO) {
      return 'card__due-date--past-time';
    }
    return '';
  });

  const dueDateFormatted = createMemo(() => {
    if (!props.dueDate) {
      return '';
    }
    const [year, month, day] = props.dueDate.split('-')
    const dueDateLocalTime = new Date(year, month - 1, day);
    return `Due ${dueDateLocalTime.toLocaleDateString()}`
  })

  return (
    <div
      role="button"
      id={`card-${props.name}`}
      class={`card ${props.disableDrag ? "card__drag-disabled" : ""} ${props.isSelected ? "card--selected" : ""}`}
      onKeyDown={(e) => {
        // Only handle Enter key, let arrow keys bubble up to board-level handler
        if (e.key === "Enter") {
          handleKeyDown(e, props.onClick);
        }
      }}
      onFocus={() => props.onFocus?.()}
      onClick={e => {
        const isDescendant = e.currentTarget === e.target || e.currentTarget.contains(e.target);
        if (!isDescendant) {
          return;
        }
        // If in selection mode, toggle selection instead of opening
        if (props.selectionMode && props.onSelectionChange) {
          e.stopPropagation();
          props.onSelectionChange(!props.isSelected);
        } else {
          props.onClick();
        }
      }}
      tabIndex="0"
    >
      <div class="card__toolbar">
        {props.headerSlot}
        {props.selectionMode && (
          <input
            type="checkbox"
            class="card__checkbox"
            checked={props.isSelected}
            onChange={(e) => {
              e.stopPropagation();
              props.onSelectionChange?.(e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
      <ul class="card__tags">
        <For each={props.tags}>
          {(tag) => (
            <li
              class="tag"
              style={{
                "background-color": tag.backgroundColor,
                "border-color": tag.backgroundColor,
              }}
            >
              <h5>{tag.name}</h5>
            </li>
          )}
        </For>
      </ul>
      <h5 class="card__content">{props.content}</h5>
      {props.owner && (
        <h5 class={`card__owner ${props.owner === props.currentUser?.email ? "card__owner--self" : ""}`}>
          {props.owner}
        </h5>
      )}
      <Show when={progress()}>
        <div class="card__progress">
          <div class="card__progress-bar">
            <div
              class="card__progress-fill"
              style={{ width: `${progressPercent()}%` }}
            />
          </div>
          <span class="card__progress-text">
            {progress().completed}/{progress().total}
          </span>
          <Show when={props.canEdit && progress().completed < progress().total}>
            <button
              class="card__progress-btn"
              title="Log progress (+1)"
              onClick={(e) => {
                e.stopPropagation();
                props.onProgressIncrement?.();
              }}
            >
              +1
            </button>
          </Show>
        </div>
      </Show>
      <h5 class={`card__due-date ${dueDateStatusClass()}`}>{dueDateFormatted()}</h5>
    </div>
  );
}
