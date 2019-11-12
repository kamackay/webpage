export default class Tracker {
  public static send(data: { feature: string; data: any }) {
    try {
      fetch("https://api.keithmackay.com/tracker/events", {
        method: "PUT",
        body: JSON.stringify({
          url: window.location.href,
          feature: data.feature,
          data: data.data,
          userAgent: navigator.userAgent
        })
      });
    } catch (err) {
      // No-op
    }
  }

  /*
  private static getLocation(): Promise<Position | null> {
    return new Promise(resolve => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          () => resolve(null)
        );
      } else {
        resolve(null);
      }
    });
  }/**/
}
