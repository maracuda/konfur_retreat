type CanBeNull<T> = T | null;
type Nullable<T> = Optional<CanBeNull<T>>;
type Optional<T> = T | undefined;
type Dictionary<T> = Record<string, T>;
type ObjectKey = string | number;
type ObjectLike = Record<string, unknown>;
type KeyOf<T, TKey extends keyof T> = TKey;
type ValueOf<T> = T[keyof T];
type AnyFunction = (...args: any[]) => any;
type Subset<T, TKey extends T> = TKey;

interface KeyValuePair<TKey, TValue> {
  key: TKey;
  value: TValue;
}

type NonNullableKey<T, Keys extends keyof T> = Omit<T, Keys> &
  {
    [P in Keys]-?: NonNullable<T[P]>;
  };

type OptionalKey<T, Keys extends keyof T> = Omit<T, Keys> &
  {
    [P in Keys]?: T[P];
  };

type CssWidth = React.CSSProperties["width"];
type CssHeight = React.CSSProperties["height"];
type CssMaxWidth = React.CSSProperties["maxWidth"];
type CssAlignItems = React.CSSProperties["alignItems"];
type CssJustifyContent = React.CSSProperties["justifyContent"];
type CssFontWeight = React.CSSProperties["fontWeight"];
type CssFontSize = React.CSSProperties["fontSize"];
type FontFamily = "Segoe UI" | "Lab Grotesque";
type Override<T extends object, U extends object> = Omit<T, Extract<keyof T, keyof U>> & U;

interface ForwardedRef<T> {
  forwardedRef: React.Ref<T>;
}

interface CanFocus {
  focus(): void;
}

interface CanBlur {
  blur(): void;
}

interface CanClear {
  clear(): void;
}

interface CanEdit {
  edit(): void;
}

declare type KeyOfAssignableTo<T extends object, Type> = { [K in keyof T]: T[K] extends Type ? K : never }[keyof T];

interface TypeOf<T> {
  new (...args: unknown[]): T;
}
