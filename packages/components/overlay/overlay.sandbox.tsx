import { Show, createSignal } from 'solid-js';

import Button, { ButtonColor } from '$/components/button';
import Overlay, { OverlayVariant } from '$/components/overlay';

export default {
  title: 'Components/Overlay',
};

export const Default = () => {
  const [overlayToggled, setOverlayToggled] = createSignal(false);
  const [overlayToggledWeak, setOverlayToggledWeak] = createSignal(false);

  return (
    <>
      <div>
        <Button
          onclick={() => {
            setOverlayToggled(!overlayToggled());
          }}
        >
          Toggle Overlay
        </Button>
        <Show when={overlayToggled()}>
          <Overlay.Content>
            <Button
              color={ButtonColor.BRAND}
              onclick={() => {
                setOverlayToggled(!overlayToggled());
              }}
            >
              Close Overlay
            </Button>
          </Overlay.Content>
          <Overlay />
        </Show>
      </div>
      <div>
        <Button
          onclick={() => {
            setOverlayToggledWeak(!overlayToggledWeak());
          }}
        >
          Toggle Overlay (Weak)
        </Button>
        <Show when={overlayToggledWeak()}>
          <Overlay.Content>
            <Button
              color={ButtonColor.BRAND}
              onclick={() => {
                setOverlayToggledWeak(!overlayToggledWeak());
              }}
            >
              Close Overlay
            </Button>
          </Overlay.Content>
          <Overlay variant={OverlayVariant.WEAK} />
        </Show>
      </div>
    </>
  );
};

export const Local = () => {
  const [overlayToggled, setOverlayToggled] = createSignal(false);

  return (
    <div style={{ position: 'relative' }}>
      <Button
        onclick={() => {
          setOverlayToggled(!overlayToggled());
        }}
      >
        Toggle Overlay
      </Button>
      <Show when={overlayToggled()}>
        <Overlay.ContentLocal>
          <Button
            color={ButtonColor.BRAND}
            onclick={() => {
              setOverlayToggled(!overlayToggled());
            }}
          >
            Close Overlay
          </Button>
        </Overlay.ContentLocal>
        <Overlay.Local />
      </Show>
    </div>
  );
};
