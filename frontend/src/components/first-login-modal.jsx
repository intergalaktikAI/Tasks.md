import { createSignal } from "solid-js";

/**
 * First login modal for choosing membership activity
 * @param {Object} props
 * @param {Function} props.onSelect - Callback when activity is selected
 */
export function FirstLoginModal(props) {
  const [selectedOption, setSelectedOption] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  const activities = [
    {
      id: "open_radiona",
      name: "Open Radiona",
      description: "Open the Radiona space for members and visitors",
      count: 10,
      icon: "🔑",
    },
    {
      id: "organise_meetup",
      name: "Organise Meetup",
      description: "Organize and host a community meetup event",
      count: 2,
      icon: "📅",
    },
    {
      id: "create_artwork",
      name: "Create Art Work",
      description: "Create and share an artwork or creative project",
      count: 1,
      icon: "🎨",
    },
  ];

  const handleConfirm = async () => {
    if (!selectedOption()) return;
    setLoading(true);
    await props.onSelect(selectedOption());
    setLoading(false);
  };

  return (
    <div class="first-login-overlay">
      <div class="first-login-modal">
        <h1>Welcome to Radiona!</h1>
        <p class="first-login-subtitle">
          As a member, you need to complete one of the following activities
          during your membership period. Please choose your preferred activity:
        </p>

        <div class="activity-options">
          {activities.map((activity) => (
            <div
              class={`activity-option ${selectedOption()?.id === activity.id ? "activity-option--selected" : ""}`}
              onClick={() => setSelectedOption(activity)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedOption(activity)}
              role="button"
              tabIndex="0"
            >
              <div class="activity-icon">{activity.icon}</div>
              <div class="activity-details">
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
                <span class="activity-count">
                  Required: {activity.count} time{activity.count > 1 ? "s" : ""}
                </span>
              </div>
              {selectedOption()?.id === activity.id && (
                <div class="activity-check">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Selected">
                    <title>Selected</title>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <p class="first-login-note">
          You will also need to pay your membership fee. This task will be
          automatically added to your board.
        </p>

        <button
          type="button"
          class="first-login-confirm"
          onClick={handleConfirm}
          disabled={!selectedOption() || loading()}
        >
          {loading() ? "Saving..." : "Confirm Selection"}
        </button>
      </div>
    </div>
  );
}
