import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Shortcut } from "@/components/kbd";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { useCallback, useState } from "react";
import useHotkeys from "@/utils/useHotkeys";
import { SocialFooter } from "@/components/social-footer";
import { ButtonGroup } from "@/components/button-group";

export function InfoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  const pngClipboardSupported = usePngClipboardSupported();

  useHotkeys("shift+/", toggleOpen);

  return (
    <ButtonGroup>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="transparent" className="hidden z-50 md:flex gap-2">
            <Info02Icon /> About
          </Button>
        </DialogTrigger>
        <DialogContent size="large">
          <div className="flex gap-8">
            <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
              <DialogTitle>Why I Built This</DialogTitle>
              <p>
                So there I was, making a slide deck—everything was looking sleek, modern,
                <span className="italic"> aesthetic af</span>.
              </p>
              <p>I had the perfect font, a subtle gradient background, nice spacing… and then I added a table.</p>
              <p className="font-bold">Boom. Instant disaster.</p>
              <p>It looked like it came straight out of a 2003 Excel sheet. Gray borders, clunky cells, zero vibe.</p>
              <p>Thats when I realized</p>
              <p className="italic">tables deserve better.</p>
              <p>
                So I built Og Table, a tool to help people (like me) create tables that actually match the design they
                are going for. Clean, customizable, export-ready, and easy to use.
              </p>
              <p className="font-bold">No more sad tables ruining beautiful slides.</p>
              <SocialFooter referral="code-image" />
            </div>

            <div className="w-px h-full bg-gray-a3" />

            <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
              <DialogTitle>About</DialogTitle>
              <p>OG Table is a simple tool that lets you design beautiful tables for your next presentation</p>
              <p>Just pick a theme, choose a background, and start filling in your table.</p>
              <p>
                Want to customize the borders? Adjust the corners? Go for it. When youre happy with the result, hit
                export to download your table as an image—oh, and yes, you can change the resolution too.
              </p>
              <DialogTitle>Roadmap 🚧</DialogTitle>
              <p>
                This project’s still in active development—and I’ve got plenty planned! Here’s a peek at what’s coming
                soon:
              </p>
              <ul className="list-disc list-inside space-y-1 ">
                <li>Make table from JSON & CSV</li>
                <li>Export as React component</li>
                <li>More customization options (borders, padding, shadows—you name it)</li>
              </ul>
              <p>Stay tuned & thanks for tagging along! 🙌</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ButtonGroup>
  );
}
