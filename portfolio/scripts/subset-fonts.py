"""Rebuild local font subsets after updating geist. Requires fonttools and brotli."""

from pathlib import Path
from shutil import copyfile

from fontTools import subset

root = Path(__file__).resolve().parents[1]
source = root / "node_modules/geist"
destination = root / "src/app/fonts"
destination.mkdir(parents=True, exist_ok=True)
unicodes = set(range(0x20, 0x100)) | set(range(0x2000, 0x2070)) | set(range(0x2190, 0x2200)) | {0x20AC, 0xFFFD}

for family, filename in [("geist-sans", "Geist"), ("geist-mono", "GeistMono")]:
    options = subset.Options()
    options.flavor = "woff2"
    font = subset.load_font(str(source / "dist/fonts" / family / f"{filename}-Variable.woff2"), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    subset.save_font(font, str(destination / f"{filename}-Latin.woff2"), options)

copyfile(source / "LICENSE.TXT", destination / "LICENSE.TXT")
