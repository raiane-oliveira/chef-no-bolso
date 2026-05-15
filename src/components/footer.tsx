import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@/components/ui/avatar'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-(--line) px-4 py-7 text-(--sea-ink-soft)">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} ChefNoBolso. Todos os direitos reservados.
        </p>

        <address className="not-italic flex items-center gap-2 text-sm">
          Desenvolvido por{' '}
          <AvatarGroup>
            <a
              href="https://github.com/raiane-oliveira"
              target="_blank"
              rel="noopener noreferrer"
              title="Raiane Oliveira"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/raiane-oliveira.png"
                  alt="@raiane-oliveira"
                />
                <AvatarFallback>RO</AvatarFallback>
              </Avatar>
            </a>

            <a
              href="https://github.com/volneygs"
              target="_blank"
              rel="noopener noreferrer"
              title=""
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/volneygs.png"
                  alt="@volneygs"
                />
                <AvatarFallback>VG</AvatarFallback>
              </Avatar>
            </a>

            <a
              href="https://github.com/phlimadev"
              target="_blank"
              rel="noopener noreferrer"
              title=""
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/phlimadev.png"
                  alt="@phlimadev"
                />
                <AvatarFallback>PL</AvatarFallback>
              </Avatar>
            </a>
          </AvatarGroup>
        </address>
      </div>
    </footer>
  )
}
