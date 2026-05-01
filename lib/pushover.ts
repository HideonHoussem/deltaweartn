export async function sendPushoverNotification(message: string, title: string = "DeltaWear New Order") {
  const userKey = process.env.PUSHOVER_USER_KEY;
  const apiToken = process.env.PUSHOVER_API_TOKEN;

  if (!userKey || !apiToken) {
    console.warn("[Pushover Warning] Credentials missing in environment variables. Notification aborted.");
    console.log("[Pushover Debug] PUSHOVER_USER_KEY:", userKey ? "Exists" : "MISSING");
    console.log("[Pushover Debug] PUSHOVER_API_TOKEN:", apiToken ? "Exists" : "MISSING");
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
        priority: 1, 
        sound: "climb",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[Pushover API Error] Response not OK:", errorData);
    } else {
      console.log("[Pushover Success] Notification sent successfully to API.");
    }
  } catch (error) {
    console.error("Failed to send Pushover notification:", error);
  }
}
