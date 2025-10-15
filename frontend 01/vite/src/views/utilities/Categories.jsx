import { useState, useEffect } from "react"
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Alert
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Image as ImageIcon, Close as CloseIcon } from "@mui/icons-material"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ name: "", slug: "" })
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [viewingImage, setViewingImage] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE_ADMIN

  useEffect(() => {
    fetchCategories()
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/categories`, {
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      })
      if (response.status === 401) throw new Error("Unauthorized — please log in again")
      if (!response.ok) throw new Error("Failed to fetch categories")

      const data = await response.json()
      setCategories(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (category) => {
    if (category) {
      setEditingCategory(category)
      setFormData({ name: category.name, slug: category.slug })
      setImagePreview(category.image_url || null)
    } else {
      setEditingCategory(null)
      setFormData({ name: "", slug: "" })
      setImagePreview(null)
    }
    setSelectedFile(null)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingCategory(null)
    setFormData({ name: "", slug: "" })
    setSelectedFile(null)
    setImagePreview(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        // ✅ EDIT mode — PATCH category (with or without image)
        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formDataToSend.append("slug", formData.slug)
        if (selectedFile) formDataToSend.append("file", selectedFile)

        const response = await fetch(`${API_BASE}/categories/${editingCategory.id}`, {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: formDataToSend,
        })

        if (!response.ok) throw new Error("Failed to update category")
      } else {
        // ✅ CREATE mode — plain JSON (no image)
        const response = await fetch(`${API_BASE}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ name: formData.name, slug: formData.slug }),
        })

        if (!response.ok) throw new Error("Failed to create category")
        const created = await response.json()

        // Optional: upload image if selected
        if (selectedFile) {
          const formDataImg = new FormData()
          formDataImg.append("file", selectedFile)
          await fetch(`${API_BASE}/categories/${created.id}/image`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: formDataImg,
          })
        }
      }

      handleCloseDialog()
      fetchCategories()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    try {
      const response = await fetch(`${API_BASE}/categories/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      if (!response.ok) throw new Error("Failed to delete category")
      fetchCategories()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleViewImage = (imageUrl, categoryName) => {
    setViewingImage({ url: imageUrl, name: categoryName })
  }

  const handleCloseImageViewer = () => setViewingImage(null)

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <h2 className="text-2xl font-semibold text-foreground">Categories</h2>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Slug</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <p className="text-muted-foreground">No categories found</p>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>
                    {category.image_url ? (
                      <img
                        src={
                          category.image_url.startsWith("http")
                            ? category.image_url
                            : `${API_BASE}/${category.image_url}`
                        }
                        alt={category.name}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                        onClick={() => handleViewImage(category.image_url, category.name)}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImageIcon sx={{ color: "grey.400" }} />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell><code className="text-sm text-primary">{category.slug}</code></TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(category)} sx={{ mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(category.id)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              fullWidth
              required
            />
            <TextField
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              fullWidth
              required
            />
            <Box>
              <Button variant="outlined" component="label" startIcon={<ImageIcon />} fullWidth>
                {selectedFile ? selectedFile.name : "Upload Image"}
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!formData.name || !formData.slug}>
            {editingCategory ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Viewer */}
      <Dialog open={!!viewingImage} onClose={handleCloseImageViewer} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {viewingImage?.name}
          <IconButton onClick={handleCloseImageViewer} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={
                viewingImage?.url?.startsWith("http")
                  ? viewingImage.url
                  : `${API_BASE}/${viewingImage?.url}`
              }
              alt={viewingImage?.name}
              style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
