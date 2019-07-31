type ActionType = (name: string, value: string) => void;

/**
 * Library to manage Settings on a per user basis. This iteration stores values using HTML5 LocalStorage
 */
export default class Settings {
  public static CommonSettings = {
    QR_URL: "QR_URL"
  };

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
  }
  private static instance: Settings;

  private cache: Map<string, string>;
  private subscriptions: Array<ActionType>;
  private specificSubscriptions: Map<string, Array<ActionType>>;
  private baseContext: string;

  private constructor(baseContext?: string) {
    this.cache = new Map<string, string>();
    this.baseContext = baseContext || "";
    this.subscriptions = new Array();
    this.specificSubscriptions = new Map();
  }

  /**
   * Get a Setting's Value
   */
  public get = (name: string, defaultVal?: string): string => {
    const fullName = this.resolve(name);
    const mapVal = this.cache.get(name);
    if (!mapVal) {
      // Didn't have this value in the cache, check localstorage for it
      // (This avoids checking localstorage too often and degrading performance)
      const storageVal = localStorage.getItem(fullName);
      if (storageVal) {
        // Put this value into the cache so that it can be found faster next time
        this.cache.set(name, storageVal);
      }
      return storageVal || defaultVal || "";
    }
    return mapVal || defaultVal || "";
  };

  /**
   * Set a Setting's Value
   */
  public set = (name: string, value: string): void => {
    this.cache.set(name, value);
    localStorage.setItem(this.resolve(name), value);
    this.subscriptions.forEach(sub =>
      this.handleSubscription(name, value, sub, this.unsubscribe.bind(this))
    );
    this.runSubsFor(name, value);
  };

  /**
   * Subscribe to global changes for all Settings.
   * Note: You should bind functions passed here or they will lose context
   * Note: If this function throws an uncaught exception, it will be unsubscribed
   *
   * @param action Code to run when a change happens
   */
  public subscribe = (action: ActionType): void => {
    this.subscriptions.push(action);
  };

  /**
   * Unsubscribe an action from future updates
   *
   * @param action Action to remove
   */
  public unsubscribe = (action: ActionType): void => {
    const index = this.subscriptions.indexOf(action, 0);
    if (index > -1) {
      this.subscriptions.splice(index, 1);
    }
  };

  /**
   * Subscribe to a specific value.
   * Note: You should bind functions passed here or they will lose context
   * Note: If this function throws an uncaught exception, it will be unsubscribed
   *
   * @param name Value to subscribe to
   * @param action Action to run on change
   */
  public subscribeTo = (name: string, action: ActionType): void => {
    const list = this.specificSubscriptions.get(name);
    if (!list) {
      this.specificSubscriptions.set(name, new Array<ActionType>(action));
    } else {
      list.push(action);
    }
  };

  /**
   * Unsubscribe an action from watching a value
   *
   * @param name Name of the Value that the Action is associated with
   * @param action Action to remove
   */
  public unsubscribeFrom(name: string, action: ActionType): void {
    const list = this.specificSubscriptions.get(name);
    if (list) {
      const index = list.indexOf(action, 0);
      if (index > -1) {
        list.splice(index, 1);
      }
    }
  }

  /**
   * Handle a subscription
   *
   * @param name Name of the value that has been updated
   * @param value New value
   * @param sub The action to send the update to
   * @param unsub Function to ubsubscribe the action if it throws an exception
   */
  private handleSubscription = (
    name: string,
    value: string,
    sub: ActionType,
    unsub: any
  ) => {
    try {
      sub.call(null, name, value);
    } catch (err) {
      console.error(
        "Error on Settings Change Subscription. This Subscription will be unsubscribed.",
        err
      );
      unsub(sub);
    }
  };

  /**
   * Resolve the name of a setting if there is a base Context
   */
  private resolve = (name: string): string =>
    `${this.baseContext}${this.baseContext ? "." : ""}${name}`;

  /**
   * Run all subscriptions for a value
   * @param name Name of the value to run subs for
   * @param value New value
   */
  private runSubsFor = (name: string, value: string) => {
    const specificSubs = this.specificSubscriptions.get(name);
    if (specificSubs) {
      specificSubs.forEach(sub =>
        this.handleSubscription(
          name,
          value,
          sub,
          ((unsub: any) => {
            this.unsubscribeFrom(name, unsub);
          }).bind(this)
        )
      );
    }
  };
}
