
export const requestNotificationPermission =
  async () => {

    if (
      !("Notification" in window)
    ) {

      alert(
        "Browser does not support notifications"
      );

      return;
    }

    const permission =
      await Notification.requestPermission();

    console.log(
      "Notification Permission:",
      permission
    );
  };



export const showNotification = (
  title,
  body
) => {

  console.log(
    "Notification Triggered"
  );

  if (
    Notification.permission ===
    "granted"
  ) {

    new Notification(title, {

      body,

      icon: "/logo.png",

    });

  } else {

    alert(
      "Notifications are blocked."
    );

  }

};

