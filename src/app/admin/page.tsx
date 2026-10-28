import type { Metadata } from "next";

import { AdminPanel } from "@/app/admin/admin-panel";
import { PageShell } from "@/components/site/page-shell";
import { adminLogout } from "@/lib/auth/actions";
import { verifyAdminSession } from "@/lib/auth/dal";
import { getContent, getDocumentGroups } from "@/lib/cms/content";
import { contentSchema } from "@/lib/cms/defaults";
import { hasBlobStore } from "@/lib/cms/store";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await verifyAdminSession();
  const [content, groups] = await Promise.all([getContent(), getDocumentGroups()]);
  const storage = hasBlobStore()
    ? "blob"
    : process.env.VERCEL
      ? "missing"
      : "local";

  return (
    <PageShell>
      <section className="admin-page" aria-labelledby="admin-title">
        <div className="site-container">
          <header className="admin-heading">
            <p className="section-eyebrow">Angemeldet als {session.username}</p>
            <h1 id="admin-title" className="page-title">
              Inhalte<br /><em>bearbeiten.</em>
            </h1>
            <p className="files-lead">
              Texte und Dokumente direkt hier anpassen. Änderungen sind nach dem
              Speichern sofort online, ohne Push.
            </p>
            <form action={adminLogout} className="admin-logout">
              <button type="submit" className="admin-button">
                Admin abmelden
              </button>
            </form>
          </header>

          <AdminPanel
            content={content}
            schema={contentSchema}
            groups={groups}
            storage={storage}
          />
        </div>
      </section>
    </PageShell>
  );
}
