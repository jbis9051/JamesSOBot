export default function formEncoder(
  form: Record<string, string | number>
): string {
  const obj: Record<string, string> = Object.entries(form).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v.toString() }),
    {}
  );
  return new URLSearchParams(obj).toString();
}
