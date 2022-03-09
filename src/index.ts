/**
 * Define the color of the notifications
 */
type Type = 'success' | 'warning' | 'danger'

/**
 * Requires a string with 2 keywords for vertical and horizontal postion.
 * @defaultvalue "top right"
 */
type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

/**
 * Define the build-in transition effect
 */
type Transition = 'fade' | 'bounce' | 'slide-blurred'

/**
 * Icon definitions
 */
type Icons = Record<Type, string>

interface NotifyOptions {
    /**
     * Title of the notification
     */
    title: string
    /**
     * Sets the HTML markup contained within the notification.
     */
    html?: string
    /**
     * Sets the type of the notification.
     * @defaultvalue "success"
     */
    type?: Type
    /**
     * Sets the position of the notification.
     * @defaultvalue "top-right"
     */
    position?: Position
    /**
     * custom top position for notification
     */
    top?: number
    /**
     * maximum limit of notifications (optional)
     */
    limit?: number
    /**
     * Auto close notification. Set in ms (milliseconds).
     * If the duration is a negative number, the notification will not be removed.
     * @defaultvalue 3000
     */
    duration?: number
    /**
     * Sets the transition effect.
     * @defaultvalue "fade"
     */
    transition?: Transition
    /**
     * Sets the configuration of the notification.
     */
    config?: {
        /**
         * Override the default icons.
         */
        icons: Icons
    } | null
}

const icons: Icons = {
    success:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 23.0771C10.5444 23.0806 9.10234 22.7965 7.75681 22.2411C6.41128 21.6857 5.18875 20.8699 4.15944 19.8406C3.13014 18.8113 2.31435 17.5888 1.75894 16.2432C1.20353 14.8977 0.919446 13.4557 0.923007 12.0001C0.925333 9.80943 1.5765 7.66858 2.79434 5.84767C4.01217 4.02676 5.7421 2.60739 7.76581 1.76868C9.78952 0.929974 12.0163 0.709508 14.1652 1.13511C16.3141 1.56071 18.2888 2.6133 19.84 4.16006C21.3925 5.70926 22.4502 7.68449 22.879 9.83543C23.3078 11.9864 23.0884 14.2162 22.2487 16.2423C21.4089 18.2684 19.9865 19.9997 18.1618 21.2166C16.3371 22.4335 14.1923 23.0814 11.999 23.0781L12 23.0771ZM7.75401 10.2231C7.65985 10.2223 7.56647 10.2401 7.47927 10.2757C7.39207 10.3112 7.31279 10.3637 7.24601 10.4301L6.23101 11.4461C6.09864 11.5818 6.02456 11.7639 6.02456 11.9536C6.02456 12.1432 6.09864 12.3253 6.23101 12.4611L10.108 16.3841C10.2435 16.5169 10.4257 16.5913 10.6155 16.5913C10.8053 16.5913 10.9875 16.5169 11.123 16.3841L18.185 9.23006C18.2629 9.15655 18.3246 9.06765 18.3663 8.96901C18.4079 8.87036 18.4286 8.76413 18.427 8.65706C18.4228 8.56335 18.3992 8.47155 18.3575 8.38752C18.3158 8.30349 18.2571 8.22908 18.185 8.16906L17.17 7.15406C17.0343 7.02115 16.8519 6.94672 16.662 6.94672C16.4721 6.94672 16.2897 7.02115 16.154 7.15406L10.985 12.5071C10.8919 12.5963 10.768 12.6461 10.639 12.6461C10.5101 12.6461 10.3861 12.5963 10.293 12.5071L8.26101 10.4301C8.19434 10.3638 8.11522 10.3114 8.0282 10.2759C7.94119 10.2403 7.848 10.2224 7.75401 10.2231Z" fill="#448432"/></svg>',
    warning:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#856404" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>',
    danger:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#721c24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 9v2m0 4v.01" /><path d="M5.07 19H19a2 2 0 0 0 1.75 -2.75L13.75 4a2 2 0 0 0 -3.5 0L3.25 16.25a2 2 0 0 0 1.75 2.75" /></svg>',
};

const TRANSITION_DURATION = 400;

const clearNotifications = (selector, limit) => {
    const elements = document.querySelectorAll<HTMLElement>(selector);

    if (elements.length < limit) {
        return;
    }

    for (let i = 0; i < elements.length && i < limit; i += 1) {
        elements[i].style.display = 'none';
    }
};

/**
 * Show a notification
 * @param {NotifyOptions} options - Options for the notification
 * @param {Function} callback - Callback function executed when the notification is closed.
 * @example Notify({ title: "My notification", type: "success" });
 */
export const Notify = (
    {
        title,
        html,
        type = 'success',
        position = 'top-right',
        top = 0,
        limit = 0,
        duration = 3000,
        transition = 'fade',
        config = {
            icons,
        },
    }: NotifyOptions,
    callback?: () => void,
) => {
    const notify = document.querySelector('#notify')!;
    const NotifyEvent = new CustomEvent('notifyclose');

    clearNotifications('#notify .notify', limit);

    if (!notify.querySelector(`[data-notify='${position}']`)) {
        const notifyWrapper = document.createElement('div');

        notifyWrapper.setAttribute('data-notify', position);

        notify.appendChild(notifyWrapper);
    }

    const notifyWrapper = notify.querySelector<HTMLElement>(`[data-notify='${position}']`)!;

    if (top) {
        notifyWrapper.style.top = `${top}px`;
    }

    const notifyContent = document.createElement('div');

    notifyContent.setAttribute('class', `notify notify--${type}`);

    // Accesibility attributes
    notifyContent.setAttribute('role', 'alert');
    notifyContent.setAttribute('aria-live', 'assertive');
    notifyContent.setAttribute('aria-atomic', 'true');

    // Grid style
    notifyContent.setAttribute('style', "---area: 'icon title'");

    notifyContent.classList.add(`${transition}-active`);
    notifyContent.classList.add(`${transition}-active`);

    setTimeout(() => {
        notifyContent.classList.remove(`${transition}-active`);
    }, TRANSITION_DURATION);

    const closeIcon = '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.306 7.93712L15.806 2.39512C15.8661 2.33786 15.914 2.26898 15.9467 2.19266C15.9795 2.11633 15.9963 2.03416 15.9963 1.95112C15.9963 1.86807 15.9795 1.7859 15.9467 1.70957C15.914 1.63325 15.8661 1.56437 15.806 1.50712L14.96 0.618116C14.9027 0.557968 14.8339 0.51008 14.7575 0.477359C14.6812 0.444638 14.599 0.427766 14.516 0.427766C14.433 0.427766 14.3508 0.444638 14.2745 0.477359C14.1981 0.51008 14.1292 0.557968 14.072 0.618116L8.52899 6.16012C8.4908 6.20017 8.44487 6.23206 8.39399 6.25385C8.34311 6.27563 8.28834 6.28687 8.23299 6.28687C8.17765 6.28687 8.12287 6.27563 8.072 6.25385C8.02112 6.23206 7.97519 6.20017 7.93699 6.16012L2.39499 0.575116C2.33774 0.514968 2.26886 0.46708 2.19254 0.434359C2.11621 0.401638 2.03404 0.384766 1.95099 0.384766C1.86795 0.384766 1.78578 0.401638 1.70945 0.434359C1.63313 0.46708 1.56425 0.514968 1.50699 0.575116L0.618994 1.46312C0.558846 1.52037 0.510958 1.58925 0.478237 1.66557C0.445516 1.7419 0.428644 1.82407 0.428644 1.90712C0.428644 1.99016 0.445516 2.07233 0.478237 2.14866C0.510958 2.22498 0.558846 2.29386 0.618994 2.35112L6.15999 7.89512C6.20005 7.93331 6.23194 7.97924 6.25372 8.03012C6.27551 8.081 6.28674 8.13577 6.28674 8.19112C6.28674 8.24646 6.27551 8.30123 6.25372 8.35211C6.23194 8.40299 6.20005 8.44892 6.15999 8.48712L0.574994 14.0721C0.514846 14.1294 0.466958 14.1983 0.434237 14.2746C0.401516 14.3509 0.384644 14.4331 0.384644 14.5161C0.384644 14.5992 0.401516 14.6813 0.434237 14.7577C0.466958 14.834 0.514846 14.9029 0.574994 14.9601L1.46299 15.8481C1.52025 15.9083 1.58913 15.9562 1.66545 15.9889C1.74178 16.0216 1.82395 16.0385 1.90699 16.0385C1.99004 16.0385 2.07221 16.0216 2.14854 15.9889C2.22486 15.9562 2.29374 15.9083 2.35099 15.8481L7.89499 10.3061C7.93319 10.2661 7.97912 10.2342 8.03 10.2124C8.08087 10.1906 8.13565 10.1794 8.19099 10.1794C8.24634 10.1794 8.30111 10.1906 8.35199 10.2124C8.40287 10.2342 8.4488 10.2661 8.48699 10.3061L14.029 15.8481C14.0862 15.9083 14.1551 15.9562 14.2315 15.9889C14.3078 16.0216 14.39 16.0385 14.473 16.0385C14.556 16.0385 14.6382 16.0216 14.7145 15.9889C14.7909 15.9562 14.8597 15.9083 14.917 15.8481L15.805 14.9601C15.8651 14.9029 15.913 14.834 15.9458 14.7577C15.9785 14.6813 15.9953 14.5992 15.9953 14.5161C15.9953 14.4331 15.9785 14.3509 15.9458 14.2746C15.913 14.1983 15.8651 14.1294 15.805 14.0721L10.305 8.53012C10.2649 8.49192 10.2331 8.44599 10.2113 8.39511C10.1895 8.34423 10.1782 8.28946 10.1782 8.23412C10.1782 8.17877 10.1895 8.124 10.2113 8.07312C10.2331 8.02224 10.2649 7.97631 10.305 7.93812L10.306 7.93712Z" fill="#393738"/></svg>';

    notifyContent.innerHTML = `<div class="notify__title">${title}${closeIcon}</div>`;

    if (html) {
        notifyContent.setAttribute('style', "---area: 'icon title' 'icon content'");
        notifyContent.innerHTML += `<div class="notify__content">${html}</div>`;
    }

    // If has custom icons
    const customIcons = { ...icons, ...config?.icons };

    notifyContent.insertAdjacentHTML('afterbegin', `<span class="notify__icon">${customIcons[type]}</span>`);

    const [vertical] = position.split('-');

    if (vertical === 'top') {
        notifyWrapper.insertAdjacentElement('afterbegin', notifyContent);
    }

    if (vertical === 'bottom') {
        notifyWrapper.insertAdjacentElement('beforeend', notifyContent);
    }

    // Check if duration is positive
    if (duration * 1 > 0) {
        setTimeout(() => {
            notifyContent.classList.add(`${transition}-leave`);
        }, duration - TRANSITION_DURATION / 2);

        setTimeout(() => {
            // If callback exists - execute it
            if (typeof callback === 'function') {
                callback();
            }

            notifyContent.dispatchEvent(NotifyEvent);
            notifyContent.remove();
        }, duration);
    }

    notifyContent.addEventListener('click', function () {
        notifyContent.classList.add(`${transition}-leave`);
        setTimeout(() => {
            this.remove();
            notifyContent.dispatchEvent(NotifyEvent);
        }, TRANSITION_DURATION / 2);
    });

    return notifyContent;
};

export const NotifyAsync = (options: NotifyOptions) => {
    const notifyContent = Notify(options);
    return new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, options?.duration || 3000);
        notifyContent.addEventListener('notifyclose', () => {
            resolve();
            clearTimeout(timer);
        });
    });
};
