import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileDropzone } from '@/components/converter/FileDropzone';
import { formats } from '@/lib/config/formats';

// Render the dropzone configured for a HEIC/HEIF source, mirroring how the
// converter pages wire it up. The component is now format-agnostic and takes
// its accepted types via props.
const heicHeifAccept = [
  ...formats.heic.exts,
  ...formats.heif.exts,
  ...formats.heic.mimes,
  ...formats.heif.mimes,
].join(',');

const dropzoneProps = {
  label: 'HEIC or HEIF',
  accept: heicHeifAccept,
  acceptText: '.heic and .heif',
};

describe('FileDropzone accessibility', () => {
  it('exposes an accessible button with a descriptive label', () => {
    render(<FileDropzone onFiles={() => {}} {...dropzoneProps} />);
    const zone = screen.getByRole('button', { name: /upload heic or heif files/i });
    expect(zone).toBeInTheDocument();
    expect(zone).toHaveAttribute('tabindex', '0');
  });

  it('is not focusable and marked disabled when disabled', () => {
    render(<FileDropzone onFiles={() => {}} {...dropzoneProps} disabled />);
    const zone = screen.getByRole('button', { name: /upload heic or heif files/i });
    expect(zone).toHaveAttribute('tabindex', '-1');
    expect(zone).toHaveAttribute('aria-disabled', 'true');
  });

  it('has a file input that accepts the configured extensions', () => {
    const { container } = render(<FileDropzone onFiles={() => {}} {...dropzoneProps} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.accept).toContain('.heic');
    expect(input.accept).toContain('.heif');
    expect(input.multiple).toBe(true);
  });

  it('opens the file picker when activated with the keyboard', async () => {
    const user = userEvent.setup();
    const { container } = render(<FileDropzone onFiles={() => {}} {...dropzoneProps} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {});

    const zone = screen.getByRole('button', { name: /upload heic or heif files/i });
    zone.focus();
    await user.keyboard('{Enter}');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('shows supported-format helper text from acceptText', () => {
    render(<FileDropzone onFiles={() => {}} {...dropzoneProps} />);
    expect(screen.getByText(/Supports .heic and .heif/i)).toBeInTheDocument();
  });
});
