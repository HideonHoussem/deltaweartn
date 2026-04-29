export async function sendPushoverNotification(message: string, title: string = "DeltaWear New Order") {
  const userKey = process.env.PUSHOVER_USER_KEY;
  const apiToken = process.env.PUSHOVER_API_TOKEN;

  if (!userKey || !apiToken) {
    console.warn("Pushover credentials missing. Notification not sent.");
    return;
  }

  try {
    const response = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: apiToken,
        user: userKey,
        message: message,
        title: title,
        priority: 1, // High priority
        sound: "climb",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Pushover API Error:", errorData);
    } else {
      console.log("Pushover notification sent successfully.");
    }
  } catch (error) {
    console.error("Failed to send Pushover notification:", error);
  }
}
